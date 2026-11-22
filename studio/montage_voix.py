"""Retouche d'une voix off sans tout réenregistrer : remonte la voix d'une vidéo à partir
de morceaux de l'ancienne voix (déjà traitée) et, si besoin, de phrases réenregistrées.

Usage : python3 studio/montage_voix.py videos/<dossier>
Lit   : <dossier>/montage.json, et au premier passage sauvegarde l'état d'origine dans
        audio/voix-avant.wav et mots-avant.json (jamais réécrits ensuite).
Écrit : audio/voix.wav, mots.json (nouveau minutage) et build/remap.json
        (ancien indice de mot -> nouvel indice, ou null si le mot a disparu).

montage.json :
{
  "segments": [
    {"src": "avant", "de": 0, "a": 4},                      # mots 0 à 4 de l'ancienne voix
    {"src": "neuf", "de": 21, "a": 30, "display": ["Et", ...]},  # mots 21 à 30 de la prise de retouche
    {"src": "avant", "de": 12, "a": 180, "pause": 0.2}      # "pause" : silence ajouté APRÈS le segment
  ],
  "neuf": {"audio": "../_retouches/prise.mp3", "mots": "../_retouches/mots.json"},  # si des segments "neuf"
  "tempo_neuf": 0.97,        # même ralentissement que la voix d'origine (voix.json -> tempo)
  "respirations": {"ajout": 0.2, "apres": [35, 61]},   # optionnel : silence ajouté après ces NOUVEAUX indices,
                                                       # seulement s'ils terminent un segment (couper le corps en plusieurs segments)
  "tail": 0.6
}
Les indices "de"/"a" sont ceux des mots (mots-avant.json pour "avant" ; mots fusionnés de la prise pour "neuf").
"""
import json, os, re, shutil, subprocess, sys
import numpy as np
from scipy.io import wavfile

SR = 48000
d = sys.argv[1].rstrip('/')
cfg = json.load(open(f'{d}/montage.json'))
os.makedirs(f'{d}/build', exist_ok=True)

if not os.path.exists(f'{d}/mots-avant.json'):
    if not os.path.exists(f'{d}/audio/voix.wav'):
        sys.exit("audio/voix.wav manque : relance d'abord studio/prep_voice.py pour recréer la voix d'origine")
    shutil.copy(f'{d}/audio/voix.wav', f'{d}/audio/voix-avant.wav')
    shutil.copy(f'{d}/mots.json', f'{d}/mots-avant.json')

def wav(path):
    sr, x = wavfile.read(path); assert sr == SR, path
    return x.astype(np.float32) / 32768

def merge(raw):
    out = []
    for w in raw:
        t = w['w']
        if out and (re.match(r"^['’,\-]", t) or re.match(r'^[?!…:;.%]+$', t)):
            out[-1]['w'] += t; out[-1]['e'] = w['e']
        else:
            out.append(dict(w))
    return out

def voiced_rms(x):
    hop = int(.02 * SR); n = len(x) // hop
    e = np.sqrt(np.mean(x[:n * hop].reshape(n, hop) ** 2, axis=1))
    v = e[e > 10 ** (-40 / 20)]
    return float(np.sqrt(np.mean(v ** 2))) if len(v) else 1e-6

src = {}
old_words = json.load(open(f'{d}/mots-avant.json'))['words']
src['avant'] = (wav(f'{d}/audio/voix-avant.wav'), old_words)
if any(s['src'] == 'neuf' for s in cfg['segments']):
    T = cfg.get('tempo_neuf', 1.0)
    tmp = f'{d}/audio/_neuf.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f"{d}/{cfg['neuf']['audio']}", '-af',
                    f'atempo={T},highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2',
                    '-ac', '1', '-ar', str(SR), '-c:a', 'pcm_s16le', tmp], check=True)
    x = wav(tmp)
    nw = merge(json.load(open(f"{d}/{cfg['neuf']['mots']}")))
    for w in nw: w['s'] /= T; w['e'] /= T
    x *= voiced_rms(src['avant'][0]) / voiced_rms(x)        # même niveau que la voix d'origine
    src['neuf'] = (x, nw)

def bounds(x, words, a, b):
    """Coupe au milieu du silence qui précède le mot a et qui suit le mot b (sans jamais mordre sur la voix)."""
    s = words[a]['s']; prev = words[a - 1]['e'] if a > 0 else 0.0
    t0 = max(prev + (s - prev) / 2, s - 0.25) if a > 0 else max(0.0, s - 0.05)
    e = words[b]['e']; nxt = words[b + 1]['s'] if b + 1 < len(words) else len(x) / SR
    # la fin d'un mot est souvent estimée trop tôt : on prolonge jusque dans le silence réel
    hop = int(.01 * SR); i = int(e * SR)
    lim = int(min(nxt, e + 0.6) * SR)
    while i + hop < lim and np.sqrt(np.mean(x[i:i + hop] ** 2)) > 10 ** (-42 / 20): i += hop
    t1 = min(i / SR + 0.12, nxt - 0.02 if b + 1 < len(words) else len(x) / SR)
    return max(t0, 0), max(t1, e)

fade = int(.008 * SR)
# regroupe les segments qui se suivent sans coupure dans la même source : aucun raccord audio entre eux
runs = []
for seg in cfg['segments']:
    p = runs[-1][-1] if runs else None
    if p and p['src'] == seg['src'] and p['a'] + 1 == seg['de'] and not p.get('pause'): runs[-1].append(seg)
    else: runs.append([seg])
out, words, remap, blocs, t = [], [], {}, [], 0.0
for run in runs:
    x, w = src[run[0]['src']]
    t0, t1 = bounds(x, w, run[0]['de'], run[-1]['a'])
    piece = x[int(t0 * SR):int(t1 * SR)].copy()
    piece[:fade] *= np.linspace(0, 1, fade); piece[-fade:] *= np.linspace(1, 0, fade)
    for seg in run:
        a, b = seg['de'], seg['a']; disp = seg.get('display')
        if disp is not None and len(disp) != b - a + 1:
            sys.exit(f"segment {seg}: {len(disp)} mots affichés pour {b - a + 1} mots audio : " + ' '.join(k['w'] for k in w[a:b + 1]))
        if seg.get('bloc'): blocs.append([seg['bloc'], len(words)])
        for k in range(a, b + 1):
            ni = len(words)
            if seg['src'] == 'avant': remap[k] = ni
            words.append({'i': ni, 'w': disp[k - a] if disp else w[k]['w'],
                          's': round(t + w[k]['s'] - t0, 3), 'e': round(t + min(w[k]['e'], t1) - t0, 3)})
    out.append(piece); t += len(piece) / SR
    pause = run[-1].get('pause', 0)
    if pause:
        out.append(np.zeros(int(pause * SR), np.float32)); t += pause
y = np.concatenate(out)
# allonge les respirations naturelles (silences d'au moins `min` s entre deux mots) si la durée est trop courte
et = cfg.get('etirer_silences')
if et:
    for k in range(len(words) - 2, -1, -1):
        if k < et.get('depuis', 0): break
        gap = words[k + 1]['s'] - words[k]['e']
        if gap >= et.get('min', 0.45):
            c = int((words[k]['e'] + gap / 2) * SR)
            y = np.concatenate([y[:c], np.zeros(int(et['ajout'] * SR), np.float32), y[c:]])
            for w2 in words[k + 1:]: w2['s'] = round(w2['s'] + et['ajout'], 3); w2['e'] = round(w2['e'] + et['ajout'], 3)
y = np.concatenate([y, np.zeros(int(cfg.get('tail', 0.6) * SR), np.float32)])
wavfile.write(f'{d}/audio/voix.wav', SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
dur = len(y) / SR
json.dump({'duration': round(dur, 3), 'words': words}, open(f'{d}/mots.json', 'w'), ensure_ascii=False, indent=0)
json.dump({str(k): remap.get(k) for k in range(len(old_words))}, open(f'{d}/build/remap.json', 'w'))
json.dump(blocs, open(f'{d}/blocs.json', 'w'), ensure_ascii=False)
# script.md reconstruit à partir des mots, avec les nouveaux blocs (l'ancien est gardé dans script-avant.md)
if not os.path.exists(f'{d}/script-avant.md'): shutil.copy(f'{d}/script.md', f'{d}/script-avant.md')
titre = open(f'{d}/script-avant.md').read().split('\n')[0]
txt = [titre, '', f'Version retouchée (structure recalée) · {len(words)} mots · {dur:.0f} s', '']
for n, (nom, i0) in enumerate(blocs):
    i1 = blocs[n + 1][1] if n + 1 < len(blocs) else len(words)
    t1b = words[i1]['s'] if i1 < len(words) else dur
    txt += [f"## {nom} ({words[i0]['s']:.0f}-{t1b:.0f} s)", ' '.join(k['w'] for k in words[i0:i1]), '']
open(f'{d}/script.md', 'w').write('\n'.join(txt))
lost = [k for k in range(len(old_words)) if k not in remap]
print(f"{d.split('/')[-1]} : durée {dur:.2f} s — {len(words)} mots — retirés : " + ' '.join(old_words[k]['w'] for k in lost)[:200])
print('   blocs :', ' | '.join(f"{nom} {words[i0]['s']:.1f}s" for nom, i0 in blocs), f"| fin = {dur - words[blocs[-1][1]]['s']:.1f} s")
