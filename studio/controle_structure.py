"""Contrôle de la structure d'une vidéo terminée (ou d'un minutage) contre le cahier des charges.
Usage : python3 studio/controle_structure.py videos/<dossier> [videos/<dossier> ...]
Lit script.md (blocs « ## HOOK », « ## RETAINER », « ## BODY », puis la fin) et mots.json."""
import json, re, sys, unicodedata

def norm(x):
    x = unicodedata.normalize('NFD', x.lower())
    return ''.join(c for c in x if c.isalnum())

def controle(d):
    import os
    m = json.load(open(f'{d}/mots.json')); w = m['words']; dur = m['duration']
    if os.path.exists(f'{d}/blocs.json'):                      # vidéo retouchée : blocs donnés par indice de mot
        bl = json.load(open(f'{d}/blocs.json')); idx = [b[1] for b in bl]; noms = [b[0] for b in bl]
        textes = [' '.join(x['w'] for x in w[a:(idx[k + 1] if k + 1 < len(idx) else len(w))]) for k, a in enumerate(idx)]
    else:
        s = open(f'{d}/script.md').read()
        blocks = re.findall(r'^##\s+(.+?)\n(.*?)(?=^##\s|\Z)', s, re.S | re.M)
        noms = [b[0] for b in blocks]; textes = [b[1] for b in blocks]
        W = [norm(x['w']) for x in w]; idx, last = [], 0
        for txt in textes:
            tk = [norm(t) for t in txt.split() if norm(t)][:3]
            i = next((i for i in range(last, len(W) - 2) if W[i:i + 3] == tk), None)
            if i is None: i = next((i for i in range(last, len(W)) if W[i] == tk[0]), last)
            idx.append(i); last = i
    pb = []
    if not 75 <= dur <= 90: pb.append(f'durée {dur:.1f} s hors 75-90 s')
    hook_fin = w[idx[1] - 1]['e']; corps = w[idx[2]]['s']; fin0 = w[idx[-1]]['s']; fin = w[-1]['e'] - fin0
    if hook_fin > 3.3: pb.append(f'accroche finie à {hook_fin:.1f} s (max 3 s)')
    if corps > 8.5: pb.append(f'annonce finie à {corps:.1f} s (max 8 s)')
    if not 2.5 <= fin <= 5.3: pb.append(f'fin de {fin:.1f} s (attendu 3-5 s)')
    if not re.search(r"\b(tu|toi|te|t'|ton|ta|tes|regarde|donne|imagine|offre)\b", textes[0].lower()): pb.append('accroche sans « tu » ni impératif')
    verbes = set(re.findall(r"\b(regarde|cache|cherche|compte|multiplie|pose|demande|signale|vérifie|calcule)\b", textes[-1].lower()))
    if 'boucle' not in noms[-1].lower() and len(verbes) > 1: pb.append(f'fin avec plusieurs actions : {", ".join(sorted(verbes))}')
    print(f"{d.rstrip('/').split('/')[-1]} : {'OK' if not pb else ' ; '.join(pb)}  [accroche {hook_fin:.1f} s · corps à {corps:.1f} s · fin {fin:.1f} s · durée {dur:.1f} s]")
    return not pb

if __name__ == '__main__':
    ok = all([controle(d) for d in sys.argv[1:]])
    sys.exit(0 if ok else 1)
