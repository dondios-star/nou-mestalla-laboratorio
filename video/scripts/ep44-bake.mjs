import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser,renderFrames,renderStill,selectComposition} from '@remotion/renderer';

// Cache only original 3D layers. UI/timing remain native 60fps Remotion.
const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx')});
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions});
try{
  const original=await selectComposition({serveUrl,id:'NouMestalla44LicenciaContratosDecision',puppeteerInstance:browser,inputProps:{renderLayer:'hero'}});
  const seek=[];
  for(const frame of [30,72,0,30]){
    const output=path.resolve(`out/ep44/live-seek-${seek.length}.png`);
    await renderStill({serveUrl,composition:{...original,props:{renderLayer:'hero'}},inputProps:{renderLayer:'hero'},frame,output,imageFormat:'png',puppeteerInstance:browser,chromiumOptions});
    seek.push({frame,hash:createHash('sha256').update(fs.readFileSync(output)).digest('hex')});
  }
  if(seek[0].hash!==seek[3].hash)throw Error('3D random-access seek mismatch');
  fs.writeFileSync('out/ep44/live-seek-report.json',JSON.stringify(seek,null,2));
  for(const [layer,last,height] of [['hero',72,1920],['map-a',126,810],['map-base',0,810]]){
    const outputDir=path.resolve(`out/ep44/bake/${layer}`);fs.mkdirSync(outputDir,{recursive:true});
    const composition={...original,height,durationInFrames:last+1,props:{renderLayer:layer},defaultProps:{renderLayer:layer}};
    console.log(`Baking ${layer}: ${last+1} frames at 1080x${height}`);
    await renderFrames({serveUrl,composition,inputProps:{renderLayer:layer},puppeteerInstance:browser,chromiumOptions,concurrency:2,imageFormat:'png',outputDir,frameRange:[0,last],timeoutInMilliseconds:120000,onStart:()=>{},onFrameUpdate:(n)=>{if(n%24===0)console.log(`${layer}: ${n}/${last+1}`);}});

  }
  const packed=spawnSync('python3',['scripts/ep44-pack.py'],{encoding:'utf8'});if(packed.status!==0)throw Error(packed.stderr);console.log(packed.stdout);
}finally{await browser.close({silent:true});}
