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
words = [{"i": i, "w": display[i], "s": round(m["s"], 3), "e": round(m["e"], 3)} for i, m in enumerate(merged)]
json.dump({"duration": round(len(y) / SR, 3), "words": words}, open(f"{d}/mots.json", "w"), ensure_ascii=False, indent=0)
print("durée", round(len(y) / SR, 2), "s —", len(words), "mots")
