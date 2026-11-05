import fs from 'node:fs';
import {openBrowser} from '@remotion/renderer';

const browser = await openBrowser('chrome', {
  browserExecutable: process.env.REMOTION_BROWSER_EXECUTABLE ?? '/usr/bin/chromium',
  chromiumOptions: {gl: 'swangle'},
});
try {
  const page = await browser.newPage({context: () => null, logLevel: 'error', indent: false,
    pageIndex: 0, onBrowserLog: null, onLog: () => {}});
  await page.goto({url: 'http://127.0.0.1:3000/BaseTecnica', timeout: 60000});
  // Poll only in the external inspection tool, never inside a composition.
  let report;
  for (let attempt = 0; attempt < 30; attempt++) {
    report = await page.evaluate(async () => {
      await document.fonts.ready;
      const canvas = document.querySelector('canvas');
      const gl = canvas?.getContext('webgl2');
      const extension = gl?.getExtension('WEBGL_debug_renderer_info');
      return {
        compositionVisible: document.body.textContent.includes('BASE DE PRODUCCIÓN'),
        fonts: [...document.fonts].map((font) => ({family: font.family, weight: font.weight, status: font.status})),
        webgl: !!gl,
        renderer: gl && extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : null,
      };
    });
    if (report.compositionVisible && report.webgl && ['Anton', 'Inter'].every((name) => report.fonts.some((font) => font.family === name && font.status === 'loaded'))) break;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!report.compositionVisible || !report.webgl) throw new Error(JSON.stringify(report));
  for (const [name, weight] of [['Anton', '400'], ['Inter', '400'], ['Inter', '700']]) {
    if (!report.fonts.some((font) => font.family === name && font.weight === weight && font.status === 'loaded')) throw new Error(`Font not loaded: ${name} ${weight}`);
  }
  fs.mkdirSync('out/validation', {recursive: true});
  fs.writeFileSync('out/validation/studio-report.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close({silent: true});
}
