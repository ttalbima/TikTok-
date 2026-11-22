"""Après un montage de voix : décale les indices de mots de plans.js et de son.json.
Usage : python3 studio/remap_plans.py videos/<dossier>
Lit build/remap.json (ancien indice -> nouvel indice ou null). Sauvegarde plans-avant.js au premier passage.
Un indice dont le mot a disparu est remplacé par le mot conservé suivant, et listé pour relecture."""
import json, re, shutil, sys, os

d = sys.argv[1].rstrip('/')
m = {int(k): v for k, v in json.load(open(f'{d}/build/remap.json')).items()}
n = max(m) + 1
def new(i, lost):
    i = int(i)
    if i >= n: return str(i)
    if m.get(i) is not None: return str(m[i])
    j = i
    while j < n and m.get(j) is None: j += 1
    k = m[j] if j < n else max(v for v in m.values() if v is not None)
    lost.append((i, k)); return str(k)

if not os.path.exists(f'{d}/plans-avant.js'): shutil.copy(f'{d}/plans.js', f'{d}/plans-avant.js')
s = open(f'{d}/plans-avant.js').read()
lost = []
ANIM = re.compile(r"\b(a|d|dur|sfx|m|hw|lw|loop|rot|bg|scene|dx|dy|from|to|hd|ld|so|e)\s*:")
def appel(txt, pos):
    """Nom de la fonction dont l'appel entoure la position pos (ex. 'E', 'O.coin', 'shot')."""
    depth = 0
    for i in range(pos - 1, -1, -1):
        c = txt[i]
        if c == ')': depth += 1
        elif c == '(':
            if depth == 0:
                return re.search(r'([\w.]*)$', txt[:i]).group(1)
            depth -= 1
    return ''
def est_un_mot(txt, g):
    """Vrai si ce « w: N » désigne un mot déclencheur, faux si c'est une largeur d'objet (O.coin({ w: 200 }))."""
    if g.group(1) != 'w': return True
    i = txt.rfind('{', 0, g.start()); j = txt.find('}', g.end())
    objet = txt[i:j + 1] if i >= 0 and j >= 0 else ''
    if '{' not in objet[1:] and ANIM.search(objet.replace(g.group(0), '')): return True
    avant = txt[:i].rstrip()
    if avant.endswith(('draw:', 'grow:', 'm: [', 'cnt(')) or re.search(r"data-(count|draw|grow)='?$", avant): return True
    return appel(txt, i) in ('E', 'V.E', 'shot', 'V.shot', 'S', 'cnt')
gardees = []
def rep(g):
    if est_un_mot(s, g): return g.group(1) + g.group(2) + new(g.group(3), lost)
    gardees.append(g.group(0)); return g.group(0)
s = re.sub(r'\b(w|hw|lw)(\s*:\s*)(\d+)\b', rep, s)
s = re.sub(r'\bS\((\d+)(\s*,)', lambda g: 'S(' + new(g.group(1), lost) + g.group(2), s)
def kw(g):
    return g.group(1) + ', '.join(new(x, []) for x in re.findall(r'\d+', g.group(2))) + g.group(3)
s = re.sub(r'(V\.keywords\s*=\s*\[)([^\]]*)(\])', kw, s)
open(f'{d}/plans.js', 'w').write(s)
if os.path.exists(f'{d}/son.json'):
    son = json.load(open(f'{d}/son.json'))
    if 'reveal_word' in son:
        son['reveal_word'] = int(new(son['reveal_word'], []))
        json.dump(son, open(f'{d}/son.json', 'w'), indent=1, ensure_ascii=False)
print(f"{d.split('/')[-1]} : indices décalés ({len(gardees)} largeurs d'objets laissées intactes) ; {len(lost)} repères pointaient sur un mot retiré (à relire dans plans.js) :",
      sorted(set(lost))[:40])
