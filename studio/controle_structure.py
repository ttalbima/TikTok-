"""Contrôle de la structure d'une vidéo terminée (ou d'un minutage) contre le cahier des charges.
Usage : python3 studio/controle_structure.py videos/<dossier> [videos/<dossier> ...]
Lit script.md (blocs « ## HOOK », « ## RETAINER », « ## BODY », puis la fin) et mots.json."""
import json, re, sys, unicodedata

def norm(x):
    x = unicodedata.normalize('NFD', x.lower())
    return ''.join(c for c in x if c.isalnum())

def controle(d):
    s = open(f'{d}/script.md').read()
    blocks = re.findall(r'^##\s+(.+?)\n(.*?)(?=^##\s|\Z)', s, re.S | re.M)
    m = json.load(open(f'{d}/mots.json')); w = m['words']; dur = m['duration']
    W = [norm(x['w']) for x in w]
    starts, last = [], 0
    for _, txt in blocks:
        tk = [norm(t) for t in txt.split() if norm(t)][:3]
        idx = next((i for i in range(last, len(W) - 2) if W[i:i + 3] == tk), None)
        if idx is None:
            idx = next((i for i in range(last, len(W)) if W[i] == tk[0]), None)
        starts.append(w[idx]['s'] if idx is not None else None)
        if idx is not None: last = idx
    pb = []
    if not 75 <= dur <= 90: pb.append(f'durée {dur:.1f} s hors 75-90 s')
    if len(starts) >= 2 and starts[1] is not None and starts[1] > 3.2: pb.append(f'hook trop long : {starts[1]:.1f} s (max 3 s)')
    if len(starts) >= 3 and starts[2] is not None and starts[2] > 8.5: pb.append(f'retainer finit à {starts[2]:.1f} s (max 8 s)')
    if starts[-1] is not None:
        fin = dur - starts[-1]
        if not 3 <= fin <= 5.5: pb.append(f'fin de {fin:.1f} s (attendu 3-5 s)')
    hook = blocks[0][1].lower()
    if not re.search(r"\b(tu|toi|te|t'|ton|ta|tes|regarde)\b", hook): pb.append('hook sans « tu »')
    fin_txt = blocks[-1][1]
    verbes = re.findall(r"\b(regarde|cache|cherche|compte|multiplie|lis|pose|demande|signale|vérifie|calcule)\b", fin_txt.lower())
    est_boucle = 'boucle' in blocks[-1][0].lower()
    if not est_boucle and len(set(verbes)) > 1: pb.append(f'fin avec plusieurs actions : {", ".join(sorted(set(verbes)))}')
    print(f"{d.rstrip('/').split('/')[-1]} : {'OK' if not pb else ' ; '.join(pb)}")
    return not pb

if __name__ == '__main__':
    ok = all([controle(d) for d in sys.argv[1:]])
    sys.exit(0 if ok else 1)
