import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {TechnicalCheck} from './validation/TechnicalCheck';
import {Episode42} from './episodes/ep42/Episode';

const Root = () => <>
  <Composition id="BaseTecnica" component={TechnicalCheck}
    width={1080} height={1920} fps={60} durationInFrames={300}/>
  <Composition id="NouMestalla42ReinicioDecision" component={Episode42}
    width={1080} height={1920} fps={60} durationInFrames={3540} defaultProps={{assetMode:'none'}}/>
</>;
registerRoot(Root);
