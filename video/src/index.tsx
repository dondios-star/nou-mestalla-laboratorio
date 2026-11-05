import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {TechnicalCheck} from './validation/TechnicalCheck';

const Root = () => <Composition id="BaseTecnica" component={TechnicalCheck}
  width={1080} height={1920} fps={60} durationInFrames={300}/>;
registerRoot(Root);
