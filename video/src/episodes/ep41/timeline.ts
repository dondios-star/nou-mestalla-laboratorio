import {progress, rewindFrame} from '../../shared/motion/time.ts';
export const scenes = [
 ['Gancho',0,210],['Comentarios',210,360],['Historia',360,540],['Rebobinado',540,720],
 ['Tú diriges',720,900],['Dos estadios',900,1200],['Financiación',1200,1500],
 ['Fase terminable',1500,1800],['Préstamo',1800,2010],['A',2010,2280],
 ['B',2280,2550],['C',2550,2820],['Decisión',2820,3150],['Siguiente',3150,3300],['Marca',3300,3540],
] as const;
export const openingSourceFrame=(frame:number)=>frame<540?frame:Math.round(rewindFrame(frame,540,647,539));
export const ageAt=(frame:number)=>frame<57?0:frame<123?1:2;
export const scarfWipe=(frame:number)=>Math.max(
 progress(frame,48,56)*(1-progress(frame,57,65)),
 progress(frame,114,122)*(1-progress(frame,123,131)));
export const options=[
 {letter:'A',title:'ASEGURAR TODA LA FINANCIACIÓN',short:'Asegurar toda la financiación.',cost:'Más garantías · arranque posterior',benefit:'Menos dependencia de la venta',status:'Recursos en negociación'},
 {letter:'B',title:'AVANZAR POR FASES FINANCIADAS',short:'Avanzar por fases financiadas.',cost:'Cierre protegido · apertura posterior',benefit:'Avance acotado, pausa prevista',status:'Decidir antes de la siguiente fase'},
 {letter:'C',title:'EMPEZAR CON PRÉSTAMO PUENTE',short:'Empezar con préstamo puente.',cost:'Vence en 12 meses · venta incierta',benefit:'Más velocidad inicial',status:'Venta sin fecha confirmada'},
] as const;
