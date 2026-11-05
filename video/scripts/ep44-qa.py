"""Inspect the decoded EP44 deliverable. Stdlib, Pillow and FFmpeg only.

Produces evidence, not an automatic assertion of human audiovisual review.
"""
import hashlib
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw

out = Path('out/ep44')
video = out / 'Nou_Mestalla_44_Licencia_Contratos_Decision_59s.mp4'
qa = out / 'qa'
qa.mkdir(parents=True, exist_ok=True)
probe = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-count_frames', '-show_streams', '-show_format',
    '-of', 'json', str(video),
]))
streams = probe['streams']
v = next(s for s in streams if s['codec_type'] == 'video')
assert (v['width'], v['height']) == (1080, 1920)
assert v['r_frame_rate'] == v['avg_frame_rate'] == '60/1'
assert v['codec_name'] == 'h264' and v['pix_fmt'] == 'yuv420p'
assert int(v['nb_read_frames']) == 3540
assert abs(float(v['duration']) - 59) < .001
assert not any(s['codec_type'] == 'audio' for s in streams)
subprocess.run(['ffmpeg', '-v', 'error', '-xerror', '-i', str(video), '-f', 'null', '-'], check=True)
boundaries = [210,360,600,720,900,1140,1380,1620,1800,2220,2640,3060,3420]
settled = [150,280,390,520,820,1030,1250,1510,1740,2050,2470,2890,3230,3490]
samples = sorted(set([0,30,31,680,1638,1656,3539] + settled + [b+d for b in boundaries for d in [-1,0,1]]))
assert len(samples) <= 60
select = '+'.join(f'eq(n\\,{f})' for f in samples)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(video), '-vf',
                f'select={select},scale=390:-1', '-fps_mode', 'passthrough',
                str(qa/'sample-%03d.png')], check=True)
for i, frame in enumerate(samples, 1):
    (qa / f'sample-{i:03d}.png').replace(qa / f'frame-{frame}.png')
for offset in range(0,len(samples),12):
    group = samples[offset:offset+12]
    sheet = Image.new('RGB',(1080,1515),'#e0d9cf')
    draw = ImageDraw.Draw(sheet)
    for i,f in enumerate(group):
        x=(i%4)*270; y=(i//4)*505
        draw.text((x+10,y+6),f'F{f} / {f/60:.3f}s',fill='#34252d')
        im=Image.open(qa/f'frame-{f}.png').resize((270,480))
        sheet.paste(im,(x,y+25))
    sheet.save(qa/f'contact-{offset//12}.jpg',quality=94)
for offset in range(0,len(settled),3):
    group=settled[offset:offset+3]
    sheet=Image.new('RGB',(390*len(group),723),'#e0d9cf');draw=ImageDraw.Draw(sheet)
    for i,f in enumerate(group):
        draw.text((390*i+10,8),f'F{f}',fill='#34252d')
        sheet.paste(Image.open(qa/f'frame-{f}.png'),(390*i,30))
    sheet.save(qa/f'mobile-{offset//3}.jpg',quality=96)
# Every decoded frame contributes to the luma / blank-frame check.
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(video),'-vf','scale=64:114',
                             '-f','rawvideo','-pix_fmt','gray','-'])
size=64*114
assert len(raw)==3540*size
means=[sum(raw[n:n+size])/size for n in range(0,len(raw),size)]
jumps=[{'frame':i,'delta':round(abs(means[i]-means[i-1]),2)} for i in range(1,len(means)) if abs(means[i]-means[i-1])>40]
moving=Image.open(qa/'frame-30.png').tobytes()!=Image.open(qa/'frame-31.png').tobytes()
assert moving, 'Adjacent moving frames must differ'
brand=[]
for frame,expected in [(3490,(75,25,49)),(1250,(244,234,216))]:
    observed=Image.open(qa/f'frame-{frame}.png').convert('RGB').getpixel((20,20))
    delta=max(abs(a-b) for a,b in zip(expected,observed))
    assert delta<=4, (frame,expected,observed)
    brand.append({'frame':frame,'expectedRGB':expected,'decodedRGB':observed,'maxChannelError':delta})
report={'probe':v,'audioStreams':0,'fullDecode':'pass','framesSampled':samples,
        'adjacentMovingFramesDistinct':moving,'meanLumaRange':[min(means),max(means)],
        'brandColorCheck':brand,
        'lumaJumpsOver40':jumps,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),
        'visualReview':'Pending recorded inspection of the generated images. No continuous visual playback implied.'}
(qa/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['audioStreams','fullDecode','adjacentMovingFramesDistinct','meanLumaRange','lumaJumpsOver40','sha256']},indent=2))
