// Technical real-time playback check. This is not a claim of human visual review.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {openBrowser} from '@remotion/renderer';

const out=path.resolve('../outputs/ep41');
const html=path.join(out,'reproducir-ep41.html');
fs.writeFileSync(html,`<!doctype html><html lang="es"><meta charset="utf-8"><title>Nou Mestalla · 41</title><style>body{margin:0;display:grid;place-items:center;background:#34252d;height:100vh}video{height:100vh;max-width:100vw}</style><video controls playsinline muted src="Nou_Mestalla_41_Decision_59s.mp4"></video></html>`);
// Serve only the two deliverable files, on loopback. The managed browser does
// not accept file:// navigation; its normal local HTTP route is used here.
const video=path.join(out,'Nou_Mestalla_41_Decision_59s.mp4');
const server=http.createServer((request,response)=>{
 if(request.url==='/'){
  response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
  response.end(fs.readFileSync(html));return;
 }
 if(request.url!=='/Nou_Mestalla_41_Decision_59s.mp4'){response.writeHead(404);response.end();return;}
 const size=fs.statSync(video).size;
 const range=/^bytes=(\d+)-(\d*)$/.exec(request.headers.range??'');
 const start=range?Number(range[1]):0,end=range&&range[2]?Math.min(Number(range[2]),size-1):size-1;
 if(start>=size||end<start){response.writeHead(416);response.end();return;}
 response.writeHead(range?206:200,{'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':end-start+1,
  ...(range?{'Content-Range':`bytes ${start}-${end}/${size}`}:{})});
 fs.createReadStream(video,{start,end}).pipe(response);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try{
 browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions:{gl:'swangle'}});
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.goto({url:`http://127.0.0.1:${server.address().port}/`,timeout:60000});
 await page.evaluate(async()=>{
  const v=document.querySelector('video');
  v.playbackRate=1;
  await v.play();
 });
 let report;
 for(let attempt=0;attempt<90;attempt++){
  report=await page.evaluate(()=>{
   const v=document.querySelector('video'),q=v.getVideoPlaybackQuality();
   return {time:v.currentTime,duration:v.duration,ended:v.ended,playbackRate:v.playbackRate,
    width:v.videoWidth,height:v.videoHeight,paused:v.paused,
    decodedFrames:q.totalVideoFrames,droppedFrames:q.droppedVideoFrames,
    error:v.error?{code:v.error.code,message:v.error.message}:null};
  });
  if(report.error)throw new Error(JSON.stringify(report.error));
  if(attempt%10===0)console.log(JSON.stringify(report));
  if(report.ended)break;
  await new Promise(resolve=>setTimeout(resolve,1000));
 }
 if(!report.ended||report.playbackRate!==1)throw new Error(`Playback incomplete: ${JSON.stringify(report)}`);
 fs.writeFileSync(path.join(out,'playback-report.json'),JSON.stringify({...report,scope:'Chromium decoded and played at 1x to ended. No continuous visual observation claimed.'},null,2)+'\n');
 console.log('Playback completed at 1x');
}finally{if(browser)await browser.close({silent:true});await new Promise(resolve=>server.close(resolve));}
