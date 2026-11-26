"""Installe une nouvelle voix (script validé, voix brute) sur une vidéo existante et recale ses plans.
Usage : python3 studio/nouvelle_voix.py videos/<dossier> <url prise 1> <url prise 2>
Fait : sauvegarde de l'état précédent (plans-prec.js, mots-prec.json, voix-prec.json, audio/prec/),
       téléchargement des deux prises, minutage de la prise 1, voix.json en mode brut, mots.json,
       décalage des indices de mots de plans.js (build/remap.json + remap_plans.py),
       installation de script-propose.md comme script.md.
Affiche : les mots de l'ancienne voix sans équivalent, et la liste indexée des nouveaux mots.
Reste à faire à la main : réécrire les plans de l'accroche, du retainer et de la boucle, poser V.style = 2."""
import difflib, json, os, re, shutil, subprocess, sys

d = sys.argv[1].rstrip('/'); urls = sys.argv[2:4]
here = os.path.dirname(os.path.abspath(__file__))
os.makedirs(f'{d}/audio/prec', exist_ok=True); os.makedirs(f'{d}/build', exist_ok=True)
for a, b in [('plans.js', 'plans-prec.js'), ('mots.json', 'mots-prec.json'), ('voix.json', 'voix-prec.json')]:
    shutil.copy(f'{d}/{a}', f'{d}/{b}')
for f in ['voix-brute.mp3', 'voix-brute-prise2.mp3', 'mots-bruts.json']:
    if os.path.exists(f'{d}/audio/{f}'): shutil.copy(f'{d}/audio/{f}', f'{d}/audio/prec/{f}')
for u, f in zip(urls, ['voix-brute.mp3', 'voix-brute-prise2.mp3']):
    subprocess.run(['curl', '-sS', '-o', f'{d}/audio/{f}', u], check=True)
env = dict(os.environ, HF_HUB_DISABLE_XET='1')
subprocess.run([sys.executable, f'{here}/align.py', f'{d}/audio/voix-brute.mp3', f'{d}/audio/mots-bruts.json'], check=True, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
raw = json.load(open(f'{d}/audio/mots-bruts.json')); m = []
for w in raw:
    t = w['w']
    if m and (re.match(r"^['’,\-]", t) or re.match(r"^[?!…:;.]+$", t)): m[-1]['w'] += t
    else: m.append(dict(w))
disp = [x['w'].replace(' ', '') for x in m]
disp[-1] = re.sub(r'[.,!?]+$', '', disp[-1]) + '…'          # la boucle reste en suspens
json.dump({'brut': True, 'tempo': 1.0, 'pause': 0.0, 'tail': 0.6, 'breaks_after': [], 'display': disp},
          open(f'{d}/voix.json', 'w'), ensure_ascii=False, indent=0)
subprocess.run([sys.executable, f'{here}/prep_voice.py', d], check=True, stdout=subprocess.DEVNULL)
old = [x['w'] for x in json.load(open(f'{d}/mots-prec.json'))['words']]
nw = json.load(open(f'{d}/mots.json')); new = [x['w'] for x in nw['words']]
norm = lambda w: re.sub(r"[^\wàâéèêîôûç€']", '', w.lower())
sm = difflib.SequenceMatcher(None, [norm(w) for w in old], [norm(w) for w in new], autojunk=False)
mp = {}
for a, b, n in sm.get_matching_blocks():
    for k in range(n): mp[a + k] = b + k
def M(i):
    j = i
    while j < len(old) and j not in mp: j += 1
    return mp.get(j, len(new) - 1)
json.dump({i: M(i) for i in range(len(old))}, open(f'{d}/build/remap.json', 'w'))
shutil.copy(f'{d}/plans-prec.js', f'{d}/plans-avant.js')
subprocess.run([sys.executable, f'{here}/remap_plans.py', d], check=True, stdout=subprocess.DEVNULL)
if os.path.exists(f'{d}/script-propose.md'):
    s = open(f'{d}/script-propose.md').read().replace('script proposé le', 'script validé par le propriétaire, proposé le').replace(', en attente de validation', '')
    open(f'{d}/script.md', 'w').write(s); os.remove(f'{d}/script-propose.md')
print('DURÉE', nw['duration'], 's —', len(new), 'mots')
print('ANCIENS MOTS SANS ÉQUIVALENT :', ' '.join(f'{i}:{old[i]}' for i in range(len(old)) if i not in mp))
print('ENTENDU :', ' '.join(f"{x['i']}:{x['w']}@{x['s']}" for x in nw['words']))
