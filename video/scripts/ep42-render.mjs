import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill, renderMedia, selectComposition} from '@remotion/renderer';

const mode=process.argv[2]??'final';
const out=path.resolve('out/ep42'); fs.mkdirSync(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx')});
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions});
try {
 const composition=await selectComposition({serveUrl,id:'NouMestalla42ReinicioDecision',puppeteerInstance:browser});
 const base={serveUrl,composition,puppeteerInstance:browser,chromiumOptions,timeoutInMilliseconds:120000};
 if(mode==='cache'){
  for(const name of process.argv[3]?.split(',')??['inside-base','inside-lines','overview-640','overview-900','overview-1000','workbay-A','workbay-B','workbay-C']){
   const assetComposition={...composition,props:{assetMode:name},defaultProps:{assetMode:name}};
   await renderStill({...base,composition:assetComposition,inputProps:{assetMode:name},frame:35,imageFormat:'png',output:path.join(out,`${name}.png`)});
   console.log(`CACHE ${name}`);
  }
 } else if(mode==='stills'){
  const samples=process.argv[3]?.split(',').map(Number)??[0,100,310,420,540,670,900,1200,1500,1770,2020,2380,2740,3050,3300,3460];
  for(const frame of samples){
   const output=path.join(out,`frame-${frame}.png`);
   await renderStill({...base,frame,imageFormat:'png',output}); console.log(`STILL ${frame}`);
  }
 } else if(mode==='seek'){
  const frames=[100,2380,540,2740,100,540,2380],hashes=[];
  for(let i=0;i<frames.length;i++){
   const output=path.join(out,`seek-${i}.png`);
   await renderStill({...base,frame:frames[i],imageFormat:'png',output});
   hashes.push(createHash('sha256').update(fs.readFileSync(output)).digest('hex'));
  }
  if(hashes[0]!==hashes[4]||hashes[1]!==hashes[6]||hashes[2]!==hashes[5])throw Error('Non-deterministic seeking');
  fs.writeFileSync(path.join(out,'seek-report.json'),JSON.stringify({frames,hashes,pass:true},null,2));
  console.log('SEEK PASS');
 } else {
  const frameRange=mode==='opening'?[0,779]:mode==='comparison'?[1860,2939]:mode==='smoke'?[1860,1919]:undefined;
  const outputLocation=path.join(out,mode==='final'?'Nou_Mestalla_42_Reinicio_Decision_59s.mp4':`${mode}.mp4`);
  let last=-1;
  await renderMedia({...base,frameRange,codec:'h264',crf:18,pixelFormat:'yuv420p',colorSpace:'bt709',
    concurrency:2,imageFormat:'png',outputLocation,
    onProgress:({renderedFrames,encodedFrames})=>{const part=Math.floor(renderedFrames/120);if(part!==last){last=part;console.log(`RENDER ${renderedFrames} encoded=${encodedFrames}`);}}});
  console.log(`DONE ${outputLocation}`);
 }
}finally{await browser.close({silent:true});}
