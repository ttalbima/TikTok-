"""Son de la vidéo : bruitages et musique composés en code, mixage, sortie finale.
Usage : python3 audio.py <dossier vidéo> <version>   (ex. v1)
Lit build/meta.json, build/image-muette.mp4, audio/voix.wav, mots.json, son.json.
Écrit livraison/<nom>-<version>.mp4 et les pistes séparées."""
import json, os, re, subprocess, sys
import numpy as np
from scipy import signal
from scipy.io import wavfile

d, ver = sys.argv[1].rstrip("/"), sys.argv[2]
name = os.path.basename(os.path.abspath(d))
SR = 48000
meta = json.load(open(f"{d}/build/meta.json"))
words = json.load(open(f"{d}/mots.json"))["words"]
son = json.load(open(f"{d}/son.json")) if os.path.exists(f"{d}/son.json") else {}
FPS = meta["fps"]
N = int(round(round(meta["duration"] * FPS) / FPS * SR))
rng = np.random.default_rng(7)
db = lambda x: 10 ** (x / 20)

sr, v = wavfile.read(f"{d}/audio/voix.wav")
assert sr == SR
voice = np.zeros(N, np.float32); voice[: min(N, len(v))] = v[:N].astype(np.float32) / 32768
vpeak = float(np.max(np.abs(voice)))

def env(n, a=.004, dec=.1):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-np.maximum(t - a, 0) / dec)
def sweep(f0, f1, dur, curve=1.0):
    t = np.arange(int(dur * SR)) / SR
    f = f0 + (f1 - f0) * (t / dur) ** curve
    return np.sin(2 * np.pi * np.cumsum(f) / SR), t
def noise(dur): return rng.standard_normal(int(dur * SR)).astype(np.float32)
def bp(x, lo, hi, order=2):
    sos = signal.butter(order, [lo, hi], btype="band", fs=SR, output="sos"); return signal.sosfilt(sos, x)
def hp(x, f, order=2): return signal.sosfilt(signal.butter(order, f, btype="high", fs=SR, output="sos"), x)
def lp(x, f, order=2): return signal.sosfilt(signal.butter(order, f, btype="low", fs=SR, output="sos"), x)
def bell(freqs, dec, dur):
    t = np.arange(int(dur * SR)) / SR
    return sum(np.sin(2 * np.pi * f * t) * np.exp(-t / (dec / (1 + .25 * i))) / (1 + i) for i, f in enumerate(freqs))

# ---------- bruitages ----------
def sfx(kind, dur=None):
    if kind == "pop":
        s, t = sweep(420, 950, .09); return s * env(len(s), .003, .035), -7
    if kind == "stamp":
        s, t = sweep(130, 55, .22); x = s * env(len(s), .002, .07)
        n = lp(noise(.06), 2500) * env(int(.06 * SR), .001, .015); x[: len(n)] += .6 * n; return x, -5
    if kind == "thud":
        s, t = sweep(110, 48, .2); x = s * env(len(s), .002, .06)
        n = bp(noise(.03), 800, 3000) * env(int(.03 * SR), .001, .008); x[: len(n)] += .35 * n; return x, -5
    if kind == "whoosh":
        n = noise(.34); k = np.linspace(0, 1, len(n))
        x = (bp(n, 300, 1200) * (1 - k) + bp(n, 1500, 6000) * k) * np.hanning(len(n)); return x, -10
    if kind == "swish":
        n = noise(.2); return bp(n, 1800, 7000) * np.hanning(len(n)), -11
    if kind == "coin":
        return bell([2093, 3136, 4186], .22, .5), -7
    if kind == "ding":
        return bell([1568, 2349, 3136, 4699], .4, .9), -6
    if kind == "kaching":
        x = np.zeros(int(.75 * SR)); c = bp(noise(.05), 900, 4000) * env(int(.05 * SR), .001, .012)
        x[: len(c)] += .8 * c; b = bell([2349, 3520, 4699], .28, .6); o = int(.07 * SR); x[o:o + len(b)] += b[: len(x) - o]; return x, -5
    if kind == "click":
        n = bp(noise(.03), 1500, 6000) * env(int(.03 * SR), .0005, .006); return n, -8
    if kind == "tick":
        L = int((dur or .5) * SR); x = np.zeros(L); c = bp(noise(.02), 2000, 7000) * env(int(.02 * SR), .0005, .004)
        for k in range(int((dur or .5) / .055)):
            o = int(k * .055 * SR); x[o:o + len(c)] += c[: L - o] * (.6 + .4 * k / 9)
        return x, -9
    if kind == "rise":
        s, t = sweep(280, 880, .38, 1.6); return s * np.hanning(len(s)), -9
    if kind == "fall":
        s, t = sweep(760, 190, .42, .7); return s * np.hanning(len(s)), -9
    if kind == "buzz":
        t = np.arange(int(.3 * SR)) / SR; x = lp(signal.square(2 * np.pi * 135 * t), 1400)
        g = ((t < .11) | ((t > .15) & (t < .28))).astype(float); return x * lp(g, 60), -13
    if kind == "print":
        L = int(.4 * SR); x = np.zeros(L); c = hp(noise(.03), 2500) * env(int(.03 * SR), .001, .008)
        for k in range(8):
            o = int(k * .045 * SR); x[o:o + len(c)] += c[: L - o]
        return x, -11
    raise ValueError(kind)

fx = np.zeros((N, 2), np.float32)
for i, e in enumerate(meta["events"]):
    x, level = sfx(e["type"], e.get("dur"))
    x = x / (np.max(np.abs(x)) + 1e-9) * vpeak * db(level)
    o = int(e["t"] * SR)
    if o >= N: continue
    x = x[: N - o]; pan = ((i * 37) % 7 - 3) / 3 * .25
    fx[o:o + len(x), 0] += x * (1 - max(pan, 0)); fx[o:o + len(x), 1] += x * (1 + min(pan, 0))

# bruitages superposés : on garde les pointes à 5 dB sous la voix
fxmax = float(np.max(np.abs(fx))) if len(meta["events"]) else 0
if fxmax > vpeak * db(-5): fx *= vpeak * db(-5) / fxmax

# ---------- musique : électro minimale, 100 BPM ----------
BPM = 100; beat = 60 / BPM; bar = 4 * beat; s16 = beat / 4
A = 220.0
note = lambda semis: A * 2 ** (semis / 12)          # demi-tons depuis la3 (220 Hz)
CH = {"Am": [0, 3, 7], "F": [-4, 0, 3], "Dm": [-7, -4, 0], "E": [-5, -1, 2], "C": [-9, -5, -2], "G": [-14, -10, -7]}
reveal = words[son["reveal_word"]]["s"] if "reveal_word" in son else 1e9
nbars = int(np.ceil(N / SR / bar))
rbar = int(round(reveal / bar))
def chord(b):
    if b == nbars - 1: return "E"                    # dominante : la boucle retombe sur la mineur
    return ["C", "G", "Am", "F"][(b - rbar) % 4] if b >= rbar else ["Am", "F", "Dm", "E"][b % 4]
scene_at = lambda t: next((s["id"] for s in meta["scenes"] if s["t0"] <= t < s["t1"]), meta["scenes"][-1]["id"])
PLAN = son.get("sections") or {}
def parts(t):
    p = PLAN.get(str(scene_at(t)), "kick hat bass pluck")
    if t >= reveal and scene_at(t) == scene_at(reveal): p = "kick hat clap bass pluck16 octave"
    return p.split()

L = np.zeros(N + SR * 2); R = np.zeros(N + SR * 2)
def add(x, t, g=1.0, pan=0.0):
    o = int(t * SR)
    if o >= len(L) - len(x): return
    L[o:o + len(x)] += x * g * (1 - max(pan, 0)); R[o:o + len(x)] += x * g * (1 + min(pan, 0))
def kick():
    t = np.arange(int(.3 * SR)) / SR; f = 48 + 110 * np.exp(-t * 34)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10)
def hat(): n = hp(noise(.05), 7000); return n * env(len(n), .001, .016)
def clap(): n = bp(noise(.12), 1100, 3200); return n * env(len(n), .001, .04)
def bass(f, dur=.32):
    t = np.arange(int(dur * SR)) / SR
    return (np.sin(2 * np.pi * f * t) + .28 * np.sin(4 * np.pi * f * t)) * np.minimum(t / .008, 1) * np.exp(-t / .16)
def pluck(f, dur=.5, bright=1.0):
    t = np.arange(int(dur * SR)) / SR; x = 0
    for k in range(1, 9):
        if f * k > 9000: break
        x = x + np.sin(2 * np.pi * f * k * t) / k * np.exp(-t * (5 + 3.2 * k / bright))
    return x * np.minimum(t / .003, 1)
K, H, C = kick(), hat(), clap()
ARP = [0, 2, 1, 2, 0, 2, 1, 2]
for b in range(nbars):
    ch = CH[chord(b)]
    for st in range(16):
        t = b * bar + st * s16
        if t >= N / SR: break
        p = parts(t); q = st % 4 == 0; e8 = st % 2 == 0
        if "kick" in p and q: add(K, t, .9)
        if "kickhalf" in p and st in (0, 10): add(K, t, .7)
        if "hat" in p and st % 4 == 2: add(H, t, .22, .2)
        if "hat16" in p and st % 2 == 1: add(H, t, .1, -.2)
        if "clap" in p and st in (4, 12): add(C, t, .3)
        if "bass" in p and st in (0, 6, 8, 14): add(bass(note(ch[0] - 24)), t, .55)
        if "basslong" in p and st == 0: add(bass(note(ch[0] - 24), .9), t, .5)
        if ("pluck" in p and e8) or "pluck16" in p:
            i = ARP[(st // (1 if "pluck16" in p else 2)) % 8]; n = ch[i % 3] + (12 if i == 3 else 0)
            add(pluck(note(n), .45), t, .2 if e8 else .13, .35 if st % 4 < 2 else -.35)
            if "octave" in p and q: add(pluck(note(n + 12), .5, 1.4), t, .1, 0)
        if "pizz" in p and st in (0, 4, 6, 8, 12): add(pluck(note(ch[(st // 2) % 3] - 12), .3, .6), t, .28, .3 if st % 8 else -.3)
# accents sur les mots-clés : note claire dans l'accord en cours
for k in meta["keywords"]:
    ch = CH[chord(int(k["t"] / bar))]
    add(pluck(note(ch[0] + 12), .7, 1.6), k["t"], .3, 0); add(pluck(note(ch[2] + 12), .7, 1.6), k["t"], .2, 0)
# écho léger (croche pointée)
dl = int(.45 * SR)
for X in (L, R):
    X[dl:] += .22 * lp(X[:-dl], 3500)
music = np.stack([L[:N], R[:N]], 1)
fo = int(.4 * SR); music[-fo:] *= np.linspace(1, .35, fo)[:, None]

# baisse automatique sous la voix
e = lp(np.abs(voice), 6)
e = np.clip(e / (.25 * np.percentile(e, 95) + 1e-9), 0, 1)
duck = 1 - (1 - db(-5)) * lp(e, 4)
music *= duck[:, None]
# niveau : 26 dB sous la voix, mesuré entre 300 et 5000 Hz pendant que la voix parle
band = lambda x: bp(x, 300, 5000, 4)
act = e > .5
rms = lambda x: float(np.sqrt(np.mean(x[act] ** 2)))
target = son.get("music_db", -21)
g = rms(band(voice)) * db(target) / rms(band(music.mean(1)))
music *= g
mdb = 20 * np.log10(rms(band(music.mean(1))) / rms(band(voice)))

# ---------- mixage et sortie ----------
vst = np.stack([voice, voice], 1)
mix = vst + fx + music
os.makedirs(f"{d}/build/son", exist_ok=True); os.makedirs(f"{d}/livraison", exist_ok=True)
def wav(path, x): wavfile.write(path, SR, x.astype(np.float32))
def lufs(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    tail = r[r.rfind("Summary:"):]
    return float(re.search(r"I:\s+(-?[\d.]+) LUFS", tail).group(1)), float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", tail).group(1))
pre = f"{d}/build/son/premix.wav"; wav(pre, mix)
I0, _ = lufs(pre)
gain = -13.0 - I0
fin = f"{d}/build/son/mix.wav"
for _ in range(3):   # le limiteur retire un peu de niveau : on corrige jusqu'à −13 LUFS
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", pre, "-af", f"volume={gain:.2f}dB,alimiter=limit=0.89:attack=3:release=60:level=disabled",
                    "-ar", str(SR), "-c:a", "pcm_s24le", fin], check=True)
    I1, tp = lufs(fin)
    if abs(I1 + 13) < .15: break
    gain += -13 - I1
out = f"{d}/livraison/{name}-{ver}"
for nm, x in (("voix", vst), ("bruitages", fx), ("musique", music)):
    tmp = f"{d}/build/son/{nm}.wav"; wav(tmp, x * db(gain))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-c:a", "flac", "-sample_fmt", "s16", f"{out}-{nm}.flac"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{d}/build/image-muette.mp4", "-c", "copy", "-movflags", "+faststart", f"{out}-image-muette.mp4"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{d}/build/image-muette.mp4", "-i", fin, "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                "-c:a", "aac", "-b:a", "224k", "-movflags", "+faststart", f"{out}.mp4"], check=True)
fxpk = float(np.max(np.abs(fx))) if len(meta["events"]) else 0
print(json.dumps({"sortie": f"{out}.mp4", "lufs": I1, "crete_dbfs": tp, "musique_vs_voix_db_300_5000": round(mdb, 1),
                  "bruitages_crete_vs_voix_db": round(20 * np.log10(fxpk / vpeak), 1), "gain_db": round(gain, 2), "bruitages": len(meta["events"])}, ensure_ascii=False))
