import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {brand} from '../shared/brand/tokens';
import '../shared/brand/fonts';
import {progress, rewindFrame} from '../shared/motion/time';
import {CommentStack} from '../shared/ui/CommentStack';
import {Phone} from '../shared/ui/Phone';
import {StadiumStudy} from '../shared/three/StadiumStudy';

export const sourceTime = (frame: number) => frame < 120 ? Math.min(frame, 119) : rewindFrame(frame, 120, 179, 119);
export const TechnicalCheck = () => {
  const frame = useCurrentFrame();
  const sourceFrame = sourceTime(frame);
  const phone = progress(frame, 180, 204);
  return <AbsoluteFill style={{background: brand.sand, color: brand.ink, fontFamily: brand.body}}>
    <StadiumStudy sourceFrame={sourceFrame}/>
    <div style={{position: 'absolute', inset: '0 0 auto', height: 470, background: `linear-gradient(${brand.sand} 78%, transparent)`}}/>
    <div style={{position: 'absolute', top: 180, left: 90, right: 150}}>
      <div style={{color: brand.wine, fontSize: 32, fontWeight: 700, letterSpacing: 3}}>NOU MESTALLA · LABORATORIO</div>
      <div style={{fontFamily: brand.heading, fontSize: 86, lineHeight: 1.1, marginTop: 20}}>BASE DE PRODUCCIÓN</div>
      <div style={{fontSize: 36, marginTop: 18}}>Estudio técnico · geometría provisional</div>
    </div>
    <CommentStack sourceFrame={sourceFrame} comments={[
      {id: 'test', author: 'Prueba', text: '¿Y si volvemos al principio?', start: 22, end: 150, x: 90, y: 1120, width: 840},
    ]}/>
    {frame >= 120 && frame < 180 && <div style={{position: 'absolute', left: 90, top: 490, fontFamily: brand.heading, fontSize: 50, color: brand.wine}}>◀◀ REBOBINADO</div>}
    <Phone rect={{x: 90, y: 520 + 45 * (1 - phone), w: 840, h: 900}} contact="Equipo · Prueba" message="Animación, fuentes y 3D. ÁÉÍÓÚ · ñ · ¿Qué ves?" opacity={phone}/>
    <div style={{position: 'absolute', left: 90, right: 150, top: 1480, borderTop: `3px solid ${brand.wine}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={{fontFamily: brand.heading, fontSize: 40, color: brand.wine, lineHeight: 1}}>ALBERTO<br/>VILLA</div>
      <div style={{fontSize: 30}}>Prueba de base · 60 fps</div>
    </div>
  </AbsoluteFill>;
};
