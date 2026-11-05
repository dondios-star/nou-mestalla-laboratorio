"""Verify the actual encoded clip; dependencies: Python stdlib + FFmpeg/ffprobe."""
import hashlib
import json
import subprocess
from pathlib import Path

out = Path('out/validation')
video = out / 'Base_Tecnica_5s.mp4'
probe = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,codec_name,pix_fmt,r_frame_rate,nb_read_frames,duration,color_space',
    '-of', 'json', str(video),
]))['streams'][0]
assert (probe['width'], probe['height']) == (1080, 1920), probe
assert probe['r_frame_rate'] == '60/1', probe
assert probe['codec_name'] == 'h264' and probe['pix_fmt'] == 'yuv420p', probe
assert int(probe['nb_read_frames']) == 300, probe
assert abs(float(probe['duration']) - 5) < 0.02, probe
subprocess.run(['ffmpeg', '-v', 'error', '-xerror', '-i', str(video), '-f', 'null', '-'], check=True)
# Frames 30 and 31 fall inside the moving camera shot. Reject a 30 fps duplicate pair.
pair = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(video), '-vf',
    'select=eq(n\\,30)+eq(n\\,31),scale=270:480', '-fps_mode', 'passthrough',
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'])
size = 270 * 480 * 3
assert len(pair) == 2 * size and pair[:size] != pair[size:], 'Adjacent moving frames duplicated'
for frame in [0, 60, 119, 120, 150, 179, 220, 299]:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(video), '-vf',
        f'select=eq(n\\,{frame}),scale=390:-1', '-frames:v', '1',
        str(out / f'phone-{frame}.png')], check=True)
report = {'probe': probe, 'fullDecode': 'pass', 'adjacentMovingFramesDistinct': True,
          'sha256': hashlib.sha256(video.read_bytes()).hexdigest(),
          'visualReview': 'Pending inspection; extracted frames alone are not a review.'}
(out / 'verify-report.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
