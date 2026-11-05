import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {TechnicalCheck} from './validation/TechnicalCheck';
import {NouMestalla45AforoDecision} from './episodes/ep45/NouMestalla45AforoDecision';

const Root = () => <>
  <Composition id="BaseTecnica" component={TechnicalCheck}
    width={1080} height={1920} fps={60} durationInFrames={300}/>
  <Composition id="NouMestalla45AforoDecision" component={NouMestalla45AforoDecision}
    width={1080} height={1920} fps={60} durationInFrames={3540}
    defaultProps={{renderPass: 'episode' as const, variant: 'base' as const, useCache: true}}/>
</>;
registerRoot(Root);
