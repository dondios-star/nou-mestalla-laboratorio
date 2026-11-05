import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';

// Only episode 45 is rendered. Source passes use the same registered composition.
const mode=process.argv[2]??'final';
const out=path.resolve('out/ep45');
const assets=path.resolve('public/assets/ep45');
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(assets,{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx')});
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE??'/usr/bin/chromium',chromiumOptions});
const base=await selectComposition({serveUrl,id:'NouMestalla45AforoDecision',puppeteerInstance:browser,inputProps:{renderPass:'stadium'}});
const options={serveUrl,puppeteerInstance:browser,chromiumOptions,timeoutInMilliseconds:120000};
const still=async(frame,file,props,height=1920)=>{
  await renderStill({...options,composition:{...base,height,props},frame,inputProps:props,imageFormat:file.endsWith('.jpg')?'jpeg':'png',output:file,...(file.endsWith('.jpg')?{jpegQuality:95}:{})});
  console.log(`Still ${frame}: ${path.basename(file)}`);
};
const movie=async(file,props,duration=3540,height=1920,range)=>{
  const started=Date.now();let last=-1;
  await renderMedia({...options,composition:{...base,height,durationInFrames:duration,props},inputProps:props,codec:'h264',pixelFormat:'yuv420p',colorSpace:'bt709',crf:18,concurrency:2,imageFormat:'jpeg',jpegQuality:95,outputLocation:file,frameRange:range,
    onProgress:({renderedFrames,encodedFrames})=>{const q=Math.floor(renderedFrames/60);if(q!==last){last=q;console.log(`${path.basename(file)}: rendered ${renderedFrames}, encoded ${encodedFrames}`);}}
  });
  console.log(`Finished ${path.basename(file)} in ${((Date.now()-started)/1000).toFixed(1)}s`);
};
const seek=async()=>{
  const frames=[60,1380,3000,60,1380],hashes=[];
  for(let i=0;i<frames.length;i++){
    const file=path.join(out,`seek-${i}-${frames[i]}.png`);
    await still(frames[i],file,{useCache:true});
    hashes.push(createHash('sha256').update(fs.readFileSync(file)).digest('hex'));
  }
  if(hashes[0]!==hashes[3]||hashes[1]!==hashes[4])throw new Error('Episode changes when frames are requested out of order');
  fs.writeFileSync(path.join(out,'seek-report.json'),JSON.stringify({frames,hashes,repeatIdentical:true},null,2)+'\n');
};
try{
  if(mode==='background')await still(0,path.join(assets,'stadium.jpg'),{renderPass:'stadium'});
  else if(mode==='proofs'){
    for(const frame of [0,118,238])await still(frame,path.join(out,`proof-hook-${frame}.png`),{renderPass:'episode',useCache:false});
    for(const variant of ['base','A','B','C'])await still(330,path.join(assets,`sector-${variant}.png`),{renderPass:'sector',variant},1000);
    for(const frame of [1000,1380,1610,3000,3500])await still(frame,path.join(out,`proof-${frame}.png`),{renderPass:'episode',useCache:false});
  }else if(mode==='assets'){
    await movie(path.join(assets,'hero.mp4'),{renderPass:'hero'},270);
    for(const variant of ['A','B','C'])await movie(path.join(assets,`sector-${variant}.mp4`),{renderPass:'sector',variant},330,1000);
  }else if(mode==='checks'){
    await seek();
    await movie(path.join(out,'critical-hook-rewind.mp4'),{useCache:true},3540,1920,[0,749]);
    await movie(path.join(out,'critical-abc.mp4'),{useCache:true},3540,1920,[1710,2849]);
  }else if(mode==='seek'){
    await seek();
  }else if(mode==='corrections'){
    // Correct only changed intervals; preserve all untouched frames of the review export.
    await movie(path.join(out,'correction-opening.mp4'),{useCache:true},3540,1920,[0,749]);
    await movie(path.join(out,'correction-options.mp4'),{useCache:true},3540,1920,[1740,2819]);
  }else if(mode==='frame'){
    const f=Number(process.argv[3]);await still(f,path.join(out,`frame-${f}.png`),{useCache:process.argv[4]!=='live'});
  }else if(mode==='final'){
    await movie(path.join(out,'Nou_Mestalla_45_Aforo_Decision_59s.mp4'),{useCache:true});
  }else throw new Error(`Unknown render mode: ${mode}`);
}finally{await browser.close({silent:true});}
