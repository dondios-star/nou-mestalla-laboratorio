import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
import {openBrowser} from '@remotion/renderer';

// External QA only: the composition itself never depends on a wall clock.
// A successful playback is a technical check, not a claim of visual viewing.
const file=path.resolve('out/ep44/Nou_Mestalla_44_Licencia_Contratos_Decision_59s.mp4');
const server=createServer((req,res)=>{
  if(req.url==='/clip.mp4'){
    res.writeHead(200,{'Content-Type':'video/mp4','Content-Length':fs.statSync(file).size});
    fs.createReadStream(file).pipe(res);
  }else{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#222}video{width:390px;height:693px}</style><video muted playsinline preload="auto" src="/clip.mp4"></video>');
  }
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions:{gl:'swangle'}});
try{
  const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
  await page.goto({url:`http://127.0.0.1:${server.address().port}`,timeout:30000});
  console.log('Playing final MP4 at normal speed, muted, in Chromium.');
  const result=await page.evaluate(async()=>{
    const video=document.querySelector('video');
    if(video.readyState<1)await new Promise((resolve,reject)=>{video.onloadedmetadata=resolve;video.onerror=reject;});
    const start=performance.now();let callbacks=0;
    const observe=()=>{callbacks++;if(!video.ended)video.requestVideoFrameCallback(observe);};
    video.requestVideoFrameCallback(observe);
    const complete=new Promise((resolve,reject)=>{
      video.onended=resolve;video.onerror=()=>reject(new Error('Playback error'));
      setTimeout(()=>{if(!video.ended)reject(new Error('Playback did not finish in 90 seconds'));},90000);
    });
    video.playbackRate=1;await video.play();await complete;
    const quality=video.getVideoPlaybackQuality();
    return {ended:video.ended,duration:video.duration,currentTime:video.currentTime,
      width:video.videoWidth,height:video.videoHeight,playbackRate:video.playbackRate,muted:video.muted,
      elapsedSeconds:(performance.now()-start)/1000,frameCallbacks:callbacks,
      totalVideoFrames:quality.totalVideoFrames,droppedVideoFrames:quality.droppedVideoFrames,
      meaning:'Technical full-length browser playback only; no claim of continuous visual inspection.'};
  });
  if(!result.ended||result.duration!==59||result.playbackRate!==1)throw Error(JSON.stringify(result));
  fs.mkdirSync('out/ep44/qa',{recursive:true});
  fs.writeFileSync('out/ep44/qa/playback.json',JSON.stringify(result,null,2)+'\n');console.log(result);
}finally{await browser.close({silent:true});server.close();}
