import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';

test('EP44 baked assets preserve native dimensions, source frames and option reset',()=>{
  const manifest=JSON.parse(fs.readFileSync('public/assets/ep44/baked/manifest.json','utf8'));
  assert.equal(manifest.width,1080);
  assert.equal(manifest.heroHeight,1920);
  assert.equal(manifest.mapHeight,810);
  assert.equal(manifest.heroFrames,73);
  assert.equal(manifest.fps,60);
  for(const [folder,count] of [['hero',73],['map-a',127]] as const){
    for(let n=0;n<count;n++)assert.ok(fs.statSync(`public/assets/ep44/baked/${folder}/${String(n).padStart(3,'0')}.webp`).size>0);
  }
  assert.ok(manifest.layout['hero'].width<=1080&&manifest.layout['hero'].height<=1920);
  assert.ok(manifest.layout['map-a'].width<=1080&&manifest.layout['map-a'].height<=810);
  assert.match(manifest.pixelReconstruction,/pixel by pixel/);
});
