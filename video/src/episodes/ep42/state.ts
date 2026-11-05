import {progress, rewindFrame} from '../../shared/motion/time.ts';

export type Branch = 'A' | 'B' | 'C';
export const timeline = [
  ['gancho', 0, 240], ['comentarios', 240, 480], ['rebobinado', 480, 600],
  ['mesa', 600, 780], ['marta', 780, 1080], ['leo', 1080, 1380],
  ['nuria', 1380, 1680], ['pregunta', 1680, 1860], ['A', 1860, 2220],
  ['B', 2220, 2580], ['C', 2580, 2940], ['voto', 2940, 3240],
  ['continuacion', 3240, 3360], ['marca', 3360, 3540],
] as const;
export const openingSource = (frame: number) => frame < 480 ? frame : rewindFrame(frame, 480, 580, 479);
export const branchState = (branch: Branch, frame: number) => {
  const revision = progress(frame, 16, 55);
  const release = progress(frame, 55, 76);
  const execution = branch === 'B' ? progress(frame, 82, 118) : 0;
  return {revision, release, execution,
    zones: frame < 16 ? ['Pendiente','Pendiente','Pendiente'] : branch === 'A'
      ? [frame < 76 ? 'En revisión' : 'Liberada', frame < 31 ? 'Pendiente' : frame < 86 ? 'En revisión' : 'Liberada', frame < 46 ? 'Pendiente' : frame < 96 ? 'En revisión' : 'Liberada']
      : branch === 'B'
        ? [frame < 76 ? 'En revisión' : 'Liberada', frame < 50 ? 'Pendiente' : 'En revisión', 'Pendiente']
        : ['Pendiente', 'Pendiente', 'Pendiente'],
    systems: branch === 'C' ? progress(frame, 20, 110) : 0,
  };
};
export const options = {
  A: {title: 'REVISAR TODO\nPRIMERO', text: 'Más certeza.\nArranque más tarde.', trade: 'Certeza / espera'},
  B: {title: 'AVANZAR\nPOR ZONAS', text: 'Arranque antes.\nMás coordinación.', trade: 'Avance / coordinación'},
  C: {title: 'ACTUALIZAR\nSISTEMAS PRIMERO', text: 'Diseño coordinado.\nObra dependiente en espera.', trade: 'Sistemas / frentes dependientes'},
} as const;
export const messages = [
  {contact: 'Marta · Estructuras', initial: 'M', text: 'Revisión general hecha. Podemos liberar zonas independientes tras revisarlas en detalle.'},
  {contact: 'Leo · Instalaciones', initial: 'L', text: 'Hay instalaciones que actualizar. Parte de lo construido sí puede aprovecharse.'},
  {contact: 'Nuria · Jefa de obra', initial: 'N', text: 'Por zonas empezaríamos antes, pero tendríamos que coordinar revisiones y obra a la vez.'},
] as const;
