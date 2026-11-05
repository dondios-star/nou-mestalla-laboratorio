import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
const mode=process.argv[2]??'stills';
const out=path.resolve('../outputs/ep41');fs.mkdirSync(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx'),publicDir:path.resolve('public'),outDir:path.resolve('build/ep41')});
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions});
try{
 const composition=await selectComposition({serveUrl,id:'NouMestalla41Decision',puppeteerInstance:browser});
 const args={serveUrl,composition,puppeteerInstance:browser,chromiumOptions,timeoutInMilliseconds:120000};
 if(mode==='stills'){
  const frames=process.argv[3]?.split(',').map(Number)??[0,100,175,250,320,440,780,1090,1350,1630,1900,2170,2440,2710,3000,3220,3420];
  for(const frame of frames){await renderStill({...args,frame,imageFormat:'png',output:path.join(out,`frame-${frame}.png`)});console.log(`STILL ${frame}`);}
 }else if(mode==='seek'){
  const frames=[175,2440,0,175];const hashes=[];
  for(let i=0;i<frames.length;i++){const file=path.join(out,`seek-${i}.png`);await renderStill({...args,frame:frames[i],imageFormat:'png',output:file});hashes.push(createHash('sha256').update(fs.readFileSync(file)).digest('hex'));}
  fs.writeFileSync(path.join(out,'determinism.json'),JSON.stringify({frames,hashes,identical:hashes[0]===hashes[3]},null,2));
  if(hashes[0]!==hashes[3])throw new Error('Non-deterministic frame');
 }else{
  const range=process.argv[3]?.split('-').map(Number);
  const start=Date.now();let last=-1;
  await renderMedia({...args,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',colorSpace:'bt709',concurrency:2,
   frameRange:range,outputLocation:path.join(out,range?`critical-${range.join('-')}.mp4`:'Nou_Mestalla_41_Decision_59s.mp4'),
   onProgress:({renderedFrames,encodedFrames})=>{const q=Math.floor(renderedFrames/60);if(q!==last){last=q;console.log(JSON.stringify({renderedFrames,encodedFrames,elapsed:Math.round((Date.now()-start)/1000)}));}},
  });
  fs.writeFileSync(path.join(out,range?'critical-render.json':'render.json'),JSON.stringify({id:composition.id,width:composition.width,height:composition.height,fps:composition.fps,frames:range??composition.durationInFrames,elapsed:(Date.now()-start)/1000,backend:'ANGLE SwiftShader CPU',crf:18},null,2));
 }
}finally{await browser.close({silent:true});}
