#!/usr/bin/env python3
"""Technical checks only. Perceptual review is recorded separately in the episode QA."""
import hashlib
import json
import subprocess
from fractions import Fraction
from pathlib import Path

root = Path(__file__).resolve().parents[2]
folder = root / 'video/out/ep45'
video = folder / 'Nou_Mestalla_45_Aforo_Decision_59s.mp4'

def run(args):
    p = subprocess.run(args, capture_output=True, text=True, check=True)
    return p.stdout, p.stderr

raw, _ = run(['ffprobe', '-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', str(video)])
info = json.loads(raw)
streams = info['streams']
v = next(s for s in streams if s['codec_type'] == 'video')
assert (v['width'], v['height']) == (1080, 1920)
assert Fraction(v['avg_frame_rate']) == 60
assert int(v['nb_read_frames']) == 3540
assert abs(float(v['duration']) - 59) < .001
assert v['codec_name'] == 'h264' and v['pix_fmt'] == 'yuv420p'
assert v['color_space'] == 'bt709'
assert not any(s['codec_type'] == 'audio' for s in streams)
_, errors = run(['ffmpeg', '-v', 'error', '-i', str(video), '-f', 'null', '-'])
assert not errors.strip(), errors
_, diagnostics = run(['ffmpeg', '-hide_banner', '-i', str(video), '-vf', 'scale=108:192,blackdetect=d=0.016:pix_th=0.10:pic_th=0.98', '-an', '-f', 'null', '-'])
assert 'black_start:' not in diagnostics, diagnostics
inventory = json.loads((root / 'docs/episodes/ep45/imagenes.json').read_text())
for item in inventory['archivos']:
    assert hashlib.sha256((root / item['path']).read_bytes()).hexdigest() == item['sha256'], item['path']
seek = json.loads((folder / 'seek-report.json').read_text())
assert seek['repeatIdentical'] and seek['hashes'][0] == seek['hashes'][3] and seek['hashes'][1] == seek['hashes'][4]
report = {
    'file': video.name, 'sha256': hashlib.sha256(video.read_bytes()).hexdigest(), 'bytes': video.stat().st_size,
    'video': {k: v[k] for k in ['codec_name','width','height','pix_fmt','color_space','avg_frame_rate','duration','nb_read_frames']},
    'audioTracks': 0, 'fullDecode': 'pass', 'blackFrames': 'none detected at 98% black threshold',
    'originalImagesUnchanged': len(inventory['archivos']), 'seek': seek,
    'visualReview': 'See docs/episodes/ep45/qa.md; metadata and frame extraction are not a complete visual playback review.',
}
(folder / 'technical-report.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
