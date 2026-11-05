"""Verify the encoded episode and prepare bounded images for manual visual review.

Run from video/. Requires FFmpeg, ffprobe and Pillow; no network access.
The generated report deliberately leaves the visual verdict pending.
"""
import hashlib
import json
import math
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw

out = Path('../outputs/ep41')
video = out / 'Nou_Mestalla_41_Decision_59s.mp4'
qa = out / 'qa-final'
qa.mkdir(exist_ok=False)
probe = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,codec_name,pix_fmt,r_frame_rate,avg_frame_rate,nb_read_frames,duration,color_space',
    '-of', 'json', str(video),
]))['streams'][0]
assert (probe['width'], probe['height']) == (1080, 1920), probe
assert probe['r_frame_rate'] == probe['avg_frame_rate'] == '60/1', probe
assert probe['codec_name'] == 'h264' and probe['pix_fmt'] == 'yuv420p', probe
assert int(probe['nb_read_frames']) == 3540, probe
assert abs(float(probe['duration']) - 59) < 0.001, probe

# Every decoded frame, not only the contact sheet, contributes to these checks.
decoder = subprocess.Popen([
    'ffmpeg', '-v', 'error', '-xerror', '-i', str(video), '-vf', 'scale=108:192,format=gray',
    '-f', 'rawvideo', '-pix_fmt', 'gray', '-'
], stdout=subprocess.PIPE)
means, black, hashes = [], [], {}
while True:
    raw = decoder.stdout.read(108 * 192)
    if not raw:
        break
    assert len(raw) == 108 * 192, 'Incomplete decoded frame'
    n = len(means)
    mean = sum(raw) / len(raw)
    means.append(mean)
    if mean < 3:
        black.append(n)
    if n in (53, 54):
        hashes[n] = hashlib.sha256(raw).hexdigest()
assert decoder.wait() == 0, 'Full decode failed'
assert len(means) == 3540 and not black, (len(means), black)
assert hashes[53] != hashes[54], 'Moving adjacent frames duplicated'
jumps = [{'frame': i, 'delta': round(means[i] - means[i-1], 2)}
         for i in range(1, len(means)) if abs(means[i] - means[i-1]) >= 40]

frames = [0, 47, 53, 57, 61, 100, 119, 123, 128, 175, 250, 320, 440,
          539, 540, 600, 647, 648, 680, 719, 780, 1090, 1170, 1200, 1224,
          1350, 1500, 1530, 1630, 1740, 1750, 1765, 1799, 1800, 1840,
          1900, 2010, 2050, 2170, 2256, 2279, 2280, 2320, 2440, 2526,
          2549, 2550, 2600, 2710, 2796, 2820, 2849, 3000, 3149, 3150,
          3220, 3300, 3312, 3420, 3539]
select = '+'.join(f'eq(n\\,{f})' for f in frames)
subprocess.run([
    'ffmpeg', '-v', 'error', '-xerror', '-i', str(video), '-vf', f'select={select}',
    '-fps_mode', 'passthrough', str(qa / 'decoded-%03d.png'),
], check=True)
for index, frame in enumerate(frames, 1):
    file = qa / f'decoded-{index:03d}.png'
    with Image.open(file) as original:
        phone = original.resize((390, 693), Image.Resampling.LANCZOS)
        phone.save(qa / f'phone-{frame}.png')
        if frame in (0, 3000):
            original.save(out / ('EP41_Gancho.png' if frame == 0 else 'EP41_Decision_ABC.png'))
        if frame in (0, 1630, 3000, 3539):
            safe = phone.copy()
            draw = ImageDraw.Draw(safe)
            # Brief-specific readable area. Not a claim about every app's controls.
            draw.rectangle((29, 54, 336, 571), outline='#cc2222', width=2)
            safe.save(qa / f'safe-{frame}.png')
    file.unlink()

settled = [0, 100, 175, 250, 320, 440, 600, 780, 1090, 1350, 1630,
           1799, 1900, 2170, 2440, 2710, 3000, 3149, 3220, 3420, 3539]
def sheet(selected, destination, columns, width):
    height = round(width * 1920 / 1080)
    canvas = Image.new('RGB', (columns * width, math.ceil(len(selected) / columns) * (height + 26)), '#dedbd7')
    draw = ImageDraw.Draw(canvas)
    for i, frame in enumerate(selected):
        x, y = (i % columns) * width, (i // columns) * (height + 26)
        with Image.open(qa / f'phone-{frame}.png') as picture:
            canvas.paste(picture.resize((width, height), Image.Resampling.LANCZOS), (x, y))
        draw.text((x + 8, y + height + 5), f'f{frame} · {frame/60:.2f}s', fill='#34252d')
    canvas.save(destination, quality=92)
sheet(settled, out / 'EP41_Hoja_de_contacto.jpg', 5, 216)
for index in range(0, len(frames), 12):
    sheet(frames[index:index+12], qa / f'review-{index//12+1}.jpg', 4, 270)

report = {
    'probe': probe, 'fullDecode': 'pass', 'decodedFrames': len(means),
    'blackFrames': black, 'luminanceJumpsAtLeast40': jumps,
    'adjacentMovingFramesDistinct': True, 'sampleFrames': frames,
    'sha256': hashlib.sha256(video.read_bytes()).hexdigest(),
    'visualReview': 'Pending actual inspection; generated evidence is not a visual verdict.',
}
(qa / 'technical-report.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
