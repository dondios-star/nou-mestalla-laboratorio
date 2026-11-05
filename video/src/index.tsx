import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {TechnicalCheck} from './validation/TechnicalCheck';
import {Episode44} from './episodes/ep44/Episode';

const Root = () => <>
  <Composition id="BaseTecnica" component={TechnicalCheck}
    width={1080} height={1920} fps={60} durationInFrames={300}/>
  <Composition id="NouMestalla44LicenciaContratosDecision" component={Episode44}
    width={1080} height={1920} fps={60} durationInFrames={3540} defaultProps={{renderLayer:'final' as const}}/>
</>;
registerRoot(Root);
