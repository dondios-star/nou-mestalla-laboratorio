import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {TechnicalCheck} from './validation/TechnicalCheck';
import {NouMestalla41Decision} from './episodes/ep41/Episode';

const Root = () => <><Composition id="BaseTecnica" component={TechnicalCheck}
  width={1080} height={1920} fps={60} durationInFrames={300}/>
  <Composition id="NouMestalla41Decision" component={NouMestalla41Decision}
    width={1080} height={1920} fps={60} durationInFrames={3540}/></>;
registerRoot(Root);
