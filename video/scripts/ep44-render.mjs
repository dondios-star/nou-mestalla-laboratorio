import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {openBrowser,renderStill,renderMedia,selectComposition} from '@remotion/renderer';

const mode=process.argv[2]??'stills';
const encoding={codec:'h264',pixelFormat:'yuv420p',crf:17,colorSpace:'bt709',concurrency:2,imageFormat:'png'};
const out=path.resolve('out/ep44');fs.mkdirSync(out,{recursive:true});
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const inputs=[...walk('src'),...walk('public/assets/ep44'),...walk('public/fonts'),'package-lock.json'];
const hash=createHash('sha256');let latestInput=0;
hash.update(JSON.stringify(encoding));
for(const file of inputs.sort()){hash.update(file);hash.update(fs.readFileSync(file));latestInput=Math.max(latestInput,fs.statSync(file).mtimeMs);}
const sourceHash=hash.digest('hex');
const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx')});
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions});
try {
  const composition=await selectComposition({serveUrl,id:'NouMestalla44LicenciaContratosDecision',puppeteerInstance:browser});
  const options={serveUrl,composition,puppeteerInstance:browser,chromiumOptions,timeoutInMilliseconds:120000};
  const ranges={hook:[0,899],evidence:[900,1799],options:[1800,3059],ending:[3060,3539],smoke:[0,119]};
  const renderClip=async(name)=>{
    const frameRange=ranges[name];const outputLocation=path.join(out,`${name}.mp4`);
    let last=0;const started=Date.now();
    await renderMedia({...options,...encoding,frameRange,outputLocation,onProgress:({renderedFrames,encodedFrames})=>{if(renderedFrames>=last+120){last=renderedFrames;console.log(JSON.stringify({clip:name,renderedFrames,encodedFrames,seconds:Math.round((Date.now()-started)/1000)}));}}});
    const report={composition:composition.id,frameRange,width:1080,height:1920,fps:60,sourceHash,seconds:(Date.now()-started)/1000,outputLocation};
    fs.writeFileSync(path.join(out,`${name}-render.json`),JSON.stringify(report,null,2));console.log(outputLocation);
  };
  if(mode==='live'){
    for(const layer of ['hero','map-base'])await renderStill({...options,composition:{...composition,height:layer==='hero'?1920:810,props:{renderLayer:layer}},inputProps:{renderLayer:layer},frame:0,imageFormat:'png',output:path.join(out,`preview-${layer}.png`)});
  }else if(mode==='stills'||mode==='seek'){
    const samples=mode==='seek'?[60,650,0,60,2100,2700,2100]:(process.argv[3]??'0,150,280,520,820,1030,1250,1510,1740,2050,2470,2890,3230,3490').split(',').map(Number);
    const results=[];
    for(const frame of samples){const file=path.join(out,`frame-${frame}.png`);await renderStill({...options,frame,imageFormat:'png',output:file});results.push({frame,sha256:createHash('sha256').update(fs.readFileSync(file)).digest('hex')});console.log(`Frame ${frame} saved`);}
    fs.writeFileSync(path.join(out,`${mode}-report.json`),JSON.stringify(results,null,2));
    if(mode==='seek'&&(results[0].sha256!==results[3].sha256||results[4].sha256!==results[6].sha256))throw Error('Non-deterministic frame');
  }else if(mode==='final'){
    const started=Date.now(),names=['hook','evidence','options','ending'];
    for(const name of names){
      const reportPath=path.join(out,`${name}-render.json`),clip=path.join(out,`${name}.mp4`);
      let reusable=false;
      if(fs.existsSync(reportPath)&&fs.existsSync(clip)){
        const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
        // One-time adoption of reviewed clips created before source hashes were added.
        // All render inputs must predate that clip's measured render start.
        const legacyUnchanged=!r.sourceHash&&latestInput<fs.statSync(reportPath).mtimeMs-r.seconds*1000;
        reusable=r.composition===composition.id&&JSON.stringify(r.frameRange)===JSON.stringify(ranges[name])&&(r.sourceHash===sourceHash||legacyUnchanged);
        if(reusable&&legacyUnchanged){r.sourceHash=sourceHash;r.provenance='Inputs predate measured render start; reviewed clip adopted';fs.writeFileSync(reportPath,JSON.stringify(r,null,2));}
      }
      if(reusable)console.log(`Reusing unchanged ${name}`);else await renderClip(name);
      const probe=spawnSync('ffprobe',['-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=width,height,nb_read_frames,r_frame_rate,codec_name,pix_fmt','-of','json',clip],{encoding:'utf8'});
      if(probe.status!==0)throw Error(probe.stderr);
      const v=JSON.parse(probe.stdout).streams[0];
      if(v.width!==1080||v.height!==1920||v.r_frame_rate!=='60/1'||v.codec_name!=='h264'||v.pix_fmt!=='yuv420p'||Number(v.nb_read_frames)!==ranges[name][1]-ranges[name][0]+1)throw Error(`Invalid segment: ${name}`);
    }
    const list=path.join(out,'concat.txt');fs.writeFileSync(list,names.map(n=>`file '${n}.mp4'`).join('\n')+'\n');
    const outputLocation=path.join(out,'Nou_Mestalla_44_Licencia_Contratos_Decision_59s.mp4');
    const result=spawnSync('ffmpeg',['-v','error','-y','-f','concat','-safe','0','-i',list,'-map','0:v:0','-c','copy','-movflags','+faststart',outputLocation],{encoding:'utf8'});
    if(result.status!==0)throw Error(result.stderr);
    fs.writeFileSync(path.join(out,'final-render.json'),JSON.stringify({composition:composition.id,frameRange:[0,3539],width:1080,height:1920,fps:60,sourceHash,seconds:(Date.now()-started)/1000,outputLocation,segments:names,method:'Native 60fps H.264 segments concatenated without re-encoding; no frame interpolation'},null,2));
    console.log(outputLocation);
  }else if(mode in ranges){await renderClip(mode);}else throw Error(`Unknown mode: ${mode}`);
}finally{await browser.close({silent:true});}
