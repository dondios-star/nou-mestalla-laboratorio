"""Extract lossless thumbnails from this episode's own native 3D renders.

Run after: node scripts/ep42-render.mjs stills 1770,2020,2380,2740
No third-party source photograph is copied, modified, or published.
"""
from pathlib import Path
from PIL import Image

out=Path('public/assets/ep42')
out.mkdir(parents=True,exist_ok=True)
for branch in ['A','B','C']:
    source=Path(f'out/ep42/workbay-{branch}.png')
    if source.exists():
        Image.open(source).crop((0,0,920,560)).save(out/f'workbay-{branch}.png')
for name in ['inside-base','inside-lines','overview-640','overview-900','overview-1000']:
    source=Path(f'out/ep42/{name}.png')
    if source.exists():
        height=1920 if name.startswith('inside') else int(name.split('-')[1])
        Image.open(source).crop((0,0,1080,height)).save(out/f'{name}.png')
Image.open(out/'overview-900.png').save(out/'stadium-overview.png')
for branch,frame in [('A',2020),('B',2380),('C',2740)]:
    source=Path(f'out/ep42/frame-{frame}.png')
    if source.exists():
        Image.open(source).crop((112,850,870,1202)).save(out/f'package-{branch}.png')
print('Four thumbnails generated from original 3D scene renders')
