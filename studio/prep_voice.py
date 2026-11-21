"""Prépare la voix : ralentit légèrement, allonge les respirations entre paragraphes,
filtre et compresse, puis recale le minutage mot à mot.
Usage : python3 prep_voice.py <dossier vidéo>   (lit audio/voix-brute.mp3, audio/mots-bruts.json, voix.json)"""
import json, subprocess, sys, re
import numpy as np
from scipy.io import wavfile

d = sys.argv[1].rstrip("/")
cfg = json.load(open(f"{d}/voix.json"))
tempo, pause, tail, breaks = cfg["tempo"], cfg["pause"], cfg["tail"], cfg["breaks_after"]
display = cfg["display"]
SR = 48000

raw = json.load(open(f"{d}/audio/mots-bruts.json"))
# fusionne les morceaux de mots (apostrophes, décimales, ponctuation seule)
merged = []
for w in raw:
    t = w["w"]
    if merged and (re.match(r"^['’,\-]", t) or re.match(r"^[?!…:;.]+$", t)):
        merged[-1]["w"] += t; merged[-1]["e"] = w["e"]
    else:
        merged.append(dict(w))
if len(display) != len(merged):
    for i, m in enumerate(merged): print(i, m["w"], display[i] if i < len(display) else "—")
    sys.exit(f"{len(display)} mots affichés pour {len(merged)} mots entendus")

# voix filtrée : coupe-bas 70 Hz, compression légère, tempo
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{d}/audio/voix-brute.mp3",
    "-af", f"atempo={tempo},highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2",
    "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", f"{d}/audio/_voix_tempo.wav"], check=True)
sr, x = wavfile.read(f"{d}/audio/_voix_tempo.wav"); x = x.astype(np.float32) / 32768

for m in merged: m["s"] /= tempo; m["e"] /= tempo
# raccourcit les silences trop longs (max_silence, en secondes) : on ne coupe que du vrai silence mesuré
max_sil = cfg.get("max_silence")
if max_sil:
    hop = int(.01 * SR)
    rms = np.sqrt(np.convolve(x ** 2, np.ones(hop) / hop, "same"))[::hop]
    quiet = rms < 10 ** (-48 / 20)
    cutlist = []
    for i in range(len(merged) - 1):
        a0, b0 = int(merged[i]["e"] * 100), int(merged[i + 1]["s"] * 100)
        best, run = (0, 0), None                    # plus long passage silencieux entre les deux mots
        for f in range(max(a0 - 10, 0), min(b0 + 1, len(quiet))):
            if quiet[f]:
                run = f if run is None else run
                if f - run + 1 > best[1] - best[0]: best = (run, f + 1)
            else: run = None
        dur = (best[1] - best[0]) / 100
        if dur > max_sil:
            mid = (best[0] + best[1]) / 200; ex = dur - max_sil
            cutlist.append((mid - ex / 2, mid + ex / 2, i))
    keep, pos = [], 0
    fd = int(.01 * SR)
    for c0, c1, i in cutlist:
        seg = x[pos:int(c0 * SR)].copy(); seg[-fd:] *= np.linspace(1, 0, fd); keep.append(seg)
        pos = int(c1 * SR); x[pos:pos + fd] *= np.linspace(0, 1, fd)
        for m in merged[i + 1:]: m["s"] -= c1 - c0; m["e"] -= c1 - c0
    keep.append(x[pos:]); x = np.concatenate(keep)
    print(len(cutlist), "silences raccourcis,", round(sum(c1 - c0 for c0, c1, _ in cutlist), 2), "s retirées")
# points d'insertion : milieu du silence après chaque mot listé
cuts = sorted(((merged[i]["e"] + merged[i + 1]["s"]) / 2, i) for i in breaks)
out, pos, shift = [], 0, 0.0
fade = int(0.012 * SR)
for t, i in cuts:
    n = int(t * SR)
    seg = x[pos:n].copy(); seg[-fade:] *= np.linspace(1, 0, fade)
    out += [seg, np.zeros(int(pause * SR), np.float32)]
    x[n:n + fade] *= np.linspace(0, 1, fade)
    pos = n
    for m in merged[i + 1:]: m["s"] += pause; m["e"] += pause
out += [x[pos:], np.zeros(int(tail * SR), np.float32)]
y = np.concatenate(out)
wavfile.write(f"{d}/audio/voix.wav", SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
# recale les débuts de mots sur la vraie reprise de la voix après chaque silence mesuré
hop = int(.01 * SR)
q = np.sqrt(np.convolve(y ** 2, np.ones(hop) / hop, "same"))[::hop] < 10 ** (-45 / 20)
fixed = 0
for i in range(len(merged) - 1):
    e0, s1 = merged[i]["e"], merged[i + 1]["s"]
    if s1 - e0 < .25: continue
    f, runs, run = int(max(e0 - .15, 0) * 100), [], None
    while f < min(int(s1 * 100) + 1, len(q)):
        if q[f]: run = f if run is None else run
        elif run is not None: runs.append((run, f)); run = None
        f += 1
    if run is not None: runs.append((run, f))
    runs = [r for r in runs if r[1] - r[0] >= 15]
    if runs:
        a0, b0 = runs[0][0] / 100, runs[0][1] / 100   # premier vrai silence après le mot
        if abs(b0 - s1) > .08: fixed += 1
        merged[i]["e"] = max(merged[i]["s"] + .05, a0); merged[i + 1]["s"] = b0
print(fixed, "débuts de mots recalés")
# corrections manuelles éventuelles : {"indice du mot": début en secondes} dans voix.json
for k, t in (cfg.get("starts") or {}).items():
    k = int(k); merged[k]["s"] = t; merged[k - 1]["e"] = min(merged[k - 1]["e"], t)
words = [{"i": i, "w": display[i], "s": round(m["s"], 3), "e": round(m["e"], 3)} for i, m in enumerate(merged)]
json.dump({"duration": round(len(y) / SR, 3), "words": words}, open(f"{d}/mots.json", "w"), ensure_ascii=False, indent=0)
print("durée", round(len(y) / SR, 2), "s —", len(words), "mots")
