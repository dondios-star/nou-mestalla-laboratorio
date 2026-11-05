"""Validate the delivered MP4 and extract finite, decoded transition evidence."""
import hashlib
import json
import subprocess
from pathlib import Path
from PIL import Image,ImageDraw

out=Path('out/ep42');video=out/'Nou_Mestalla_42_Reinicio_Decision_59s.mp4'
meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-select_streams','v:0','-show_streams','-of','json',str(video)]))['streams'][0]
assert (meta['width'],meta['height'])==(1080,1920)
assert meta['r_frame_rate']==meta['avg_frame_rate']=='60/1'
assert int(meta['nb_read_frames'])==3540
assert float(meta['duration'])==59
assert meta['codec_name']=='h264' and meta['pix_fmt']=='yuv420p'
assert meta['color_space']=='bt709'
subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(video),'-f','null','-'],check=True)

# Every frame is decoded; only a finite list is kept as visual evidence.
boundaries=[35,240,360,480,558,600,720,780,1080,1380,1680,1716,1860,1980,2220,2340,2580,2700,2940,3240,3360]
frames=sorted(set([0,25,26,55,100,210,310,420,500,540,570,670,750,810,900,1104,1200,1404,1500,1690,1700,1770,1876,1936,2020,2236,2295,2296,2302,2340,2380,2600,2690,2740,2964,3050,3300,3384,3460,3539]+[f+d for f in boundaries for d in [-2,-1,0,1,2]]))
qa=out/'decoded';qa.mkdir(exist_ok=True)
# Bound expression depth: a long ungrouped sum exceeds FFmpeg's parser limit.
terms=[f'eq(n\\,{f})' for f in frames]
select='+'.join('('+ '+'.join(terms[i:i+24]) +')' for i in range(0,len(terms),24))
subprocess.run(['ffmpeg','-v','error','-y','-i',str(video),'-vf',f'select={select},scale=390:694','-fps_mode','passthrough',str(qa/'sample-%03d.png')],check=True)
files=sorted(qa.glob('sample-*.png'));assert len(files)==len(frames)
mapping=dict(zip(frames,files))
for f,p in mapping.items():p.rename(qa/f'frame-{f:04}.png')
moving=[Image.open(qa/f'frame-{f:04}.png').tobytes() for f in [25,26]]
assert moving[0]!=moving[1], 'Moving frames are duplicates'
for index,start in enumerate(range(0,len(frames),6)):
    group=frames[start:start+6]
    sheet=Image.new('RGB',(390*len(group),724),'#e4e0d7')
    d=ImageDraw.Draw(sheet)
    for j,f in enumerate(group):
        sheet.paste(Image.open(qa/f'frame-{f:04}.png'),(390*j,30));d.text((390*j+12,8),f'frame {f} / {f/60:.3f}s',fill='black')
    sheet.save(qa/f'strip-{index:02}.jpg',quality=90)
# Numeric margins transcribed from the guide currently linked by LinkedIn Help.
# This is our review mask, not a copy of their example photograph or app UI.
for f in [0,100,310,420,670,900,1200,1500,1770,2020,2380,2740,3050,3300,3460]:
    im=Image.open(qa/f'frame-{f:04}.png').convert('RGBA')
    overlay=Image.new('RGBA',im.size);draw=ImageDraw.Draw(overlay)
    x1,y1,x2,y2=[round(v*390/1080) for v in [112,260,870,1360]]
    for rect in [(0,0,390,y1),(0,y2,390,694),(0,y1,x1,y2),(x2,y1,390,y2)]:
        draw.rectangle(rect,fill=(175,20,90,45))
    draw.rectangle((x1,y1,x2,y2),outline=(210,40,90,230),width=1)
    Image.alpha_composite(im,overlay).convert('RGB').save(qa/f'safe-official-{f:04}.png')
report={'codec':meta['codec_name'],'width':1080,'height':1920,'fps':'60/1','frames':3540,'duration':59,'pixelFormat':meta['pix_fmt'],'color':meta['color_space'],'fullDecode':'pass','adjacentMovingFramesDistinct':True,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'sampledFrames':frames,'normalSpeedVisualPlayback':'not available through current tools; do not infer from frame sheets'}
(out/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
