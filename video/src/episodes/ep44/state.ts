import {progress, lerp, rewindFrame} from '../../shared/motion/time';

export const EP44 = {fps: 60, frames: 3540, width: 1080, height: 1920} as const;
export type Choice = 'base' | 'A' | 'B' | 'C';
export const sourceTime = (frame: number) => frame < 600 ? frame : rewindFrame(frame, 600, 719, 599);
export const truckTravel = (source: number) => lerp(-0.42, 0, 1 - Math.pow(1 - Math.min(1, Math.max(0, source / 72)), 3));
export const optionState = (frame: number) => {
  const choice: Choice = frame < 1800 ? 'base' : frame < 2220 ? 'A' : frame < 2640 ? 'B' : 'C';
  const start = choice === 'A' ? 1800 : choice === 'B' ? 2220 : choice === 'C' ? 2640 : 0;
  return {choice, local: frame - start, action: choice === 'base' ? 0 : progress(frame, start + 24, start + 150)};
};
export const options = {
  A: {title: 'Contratar por partes', benefit: 'Empiezas por zonas', cost: 'Coordinas contratos', short: 'Por partes', risk: 'Más coordinación'},
  B: {title: 'Un contrato global', benefit: 'Centralizas coordinación', cost: 'Esperas al diseño', short: 'Global', risk: 'Más espera inicial'},
  C: {title: 'Reservar la cuadrilla', benefit: 'Proteges disponibilidad', cost: 'Arriesgas la señal', short: 'Reserva', risk: 'Señal comprometida'},
} as const;
