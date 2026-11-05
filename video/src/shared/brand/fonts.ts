import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// loadFont integrates with Remotion's render delay; never download fonts per frame.
export const fontsReady = Promise.all([
  loadFont({family: 'Anton', url: staticFile('fonts/anton-latin-400-normal.woff2'), weight: '400'}),
  loadFont({family: 'Inter', url: staticFile('fonts/inter-latin-400-normal.woff2'), weight: '400'}),
  loadFont({family: 'Inter', url: staticFile('fonts/inter-latin-700-normal.woff2'), weight: '700'}),
]);
