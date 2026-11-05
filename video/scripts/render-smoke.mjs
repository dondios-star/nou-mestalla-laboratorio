import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderMedia, renderStill, selectComposition} from '@remotion/renderer';

const out = path.resolve('out/validation');
fs.mkdirSync(out, {recursive: true});
const started = Date.now();
const serveUrl = await bundle({entryPoint: path.resolve('src/index.tsx')});
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? '/usr/bin/chromium';
const chromiumOptions = {gl: 'swangle'};
const browser = await openBrowser('chrome', {browserExecutable, chromiumOptions});
try {
  const composition = await selectComposition({serveUrl, id: 'BaseTecnica', puppeteerInstance: browser});
  const options = {serveUrl, composition, puppeteerInstance: browser, chromiumOptions, timeoutInMilliseconds: 120000};
  // The same frame requested after unrelated frames must be pixel-identical.
  const samples = [60, 220, 0, 60];
  const hashes = [];
  for (let i = 0; i < samples.length; i++) {
    const file = path.join(out, `seek-${i}-${samples[i]}.png`);
    await renderStill({...options, frame: samples[i], imageFormat: 'png', output: file});
    hashes.push(createHash('sha256').update(fs.readFileSync(file)).digest('hex'));
  }
  if (hashes[0] !== hashes[3]) throw new Error('Frame 60 changes when requested out of order');
  if (hashes[0] === hashes[2]) throw new Error('3D / comments did not animate');
  console.log('Out-of-order frame checks passed. Rendering 300 frames…');
  await renderMedia({...options, codec: 'h264', pixelFormat: 'yuv420p', crf: 18,
    concurrency: 2, imageFormat: 'png', colorSpace: 'bt709',
    outputLocation: path.join(out, 'Base_Tecnica_5s.mp4'),
    onProgress: ({renderedFrames}) => {
      if (renderedFrames > 0 && renderedFrames % 60 === 0) console.log(`Rendered ${renderedFrames}/300`);
    },
  });
  fs.writeFileSync(path.join(out, 'render-report.json'), JSON.stringify({
    composition: composition.id, dimensions: [composition.width, composition.height],
    fps: composition.fps, frames: composition.durationInFrames,
    browserExecutable, chromiumOptions, backend: 'software ANGLE / SwiftShader',
    seekOrder: samples, hashes, seekRepeatIdentical: true,
    elapsedSeconds: (Date.now() - started) / 1000,
    completedAt: new Date().toISOString(),
  }, null, 2) + '\n');
} finally {
  await browser.close({silent: true});
}
