"""Package editable sources and redistributable resources, never credentials/caches."""
import hashlib
import json
import zipfile
from pathlib import Path

root=Path(__file__).resolve().parents[2]
out=root/'video/out/ep44'
target=out/'Nou_Mestalla_EP44_Fuentes.zip'
files=set()
for name in ['README.md','AGENTS.md','.gitignore','.nvmrc',
             'Prompt_Codex_Nou_Mestalla_44_Licencia_y_Contratos.txt',
             'video/package.json','video/package-lock.json','video/tsconfig.json',
             'video/remotion.config.ts','scripts/install.sh']:
    p=root/name
    if p.is_file(): files.add(p)
for folder in ['video/src','video/scripts','video/tests','video/public/fonts',
               'video/public/assets/ep44','docs/episodes/ep44','docs/setup',
               '.agents/skills','referencias/episodios/ep44/web']:
    files.update(p for p in (root/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
for name in ['qa/report.json','qa/playback.json','live-seek-report.json','seek-report.json',
             'hook-render.json','evidence-render.json','options-render.json','ending-render.json',
             'final-render.json','rewind-fix-provenance.json']:
    p=out/name
    if p.is_file():files.add(p)
manifest={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(files)}
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as archive:
    for p in sorted(files):archive.write(p,'Nou_Mestalla_EP44/'+str(p.relative_to(root)))
    archive.writestr('Nou_Mestalla_EP44/source-manifest.json',json.dumps(manifest,indent=2)+'\n')
    archive.writestr('Nou_Mestalla_EP44/ABRIR-EP44.txt',
        'Node 24, Chromium /usr/bin/chromium, Python 3 + Pillow, FFmpeg/ffprobe.\n'
        'Desde esta carpeta: bash scripts/install.sh\n'
        'cd video\nnpm run studio\n'
        'http://localhost:3000/NouMestalla44LicenciaContratosDecision\n'
        'Render: node scripts/ep44-render.mjs final\n'
        'Tras cambiar 3D: node scripts/ep44-bake.mjs\n'
        'Ver docs/episodes/ep44/README.md y REVISION-EP44.md.\n'
        'Los originales de Imágenes/ permanecen en el repositorio; no son necesarios para renderizar.\n')
with zipfile.ZipFile(target) as archive:assert archive.testzip() is None
print(json.dumps({'path':str(target),'files':len(files),'bytes':target.stat().st_size,
                  'sha256':hashlib.sha256(target.read_bytes()).hexdigest()},indent=2))
