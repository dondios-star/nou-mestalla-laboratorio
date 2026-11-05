export const COPY = {
  hook: 'Más espacio.\n¿Quién se queda fuera?',
  simulation: 'SIMULACIÓN DE DISEÑO',
  series: 'NOU MESTALLA · 45',
  rewind: 'ANTES DE CERRAR\nEL DISEÑO',
  role: 'Ahora diriges tú\nel Nou Mestalla',
  signature: 'Aprendiendo gestión de proyectos\ncon ejemplos reales',
  question: '¿Qué diseño\naprobarías?',
  closing: 'A, B o C.\n¿Qué sacrificarías?',
} as const;

export const MESSAGES = [
  {sender: 'Marta · Afición', text: 'La base cubre lo habitual. En los grandes partidos faltarían plazas.', note: 'DEMANDA VARIABLE', detail: 'Un partido habitual', from: 930},
  {sender: 'Lucía · Arquitecta', text: 'Ampliar es viable. Prepararlo y volver a construir cuesta.', note: 'ADAPTACIÓN ESTUDIADA', detail: 'Previsiones ahora · Otra obra después', from: 1200},
  {sender: 'Javi · Dirección', text: 'Prioridad: entradas asequibles sin pagar ahora capacidad poco usada.', note: 'EL OBJETIVO', detail: 'Elige qué desarrollar', from: 1470},
] as const;

export const OPTIONS = [
  {id: 'A', title: 'Toda la capacidad\nahora', benefit: 'Más plazas hoy', cost: 'Más inversión inicial', note: 'En un partido habitual,\nparte puede quedar vacía.', summary: 'Toda la capacidad ahora', summaryCost: 'Más inversión inicial'},
  {id: 'B', title: 'Base con ampliación\npreparada', benefit: 'Menos inversión hoy', cost: 'Otra obra después', note: 'Preparación incluida\nFUTURO POSIBLE', summary: 'Base con ampliación', summaryCost: 'Preparación + otra obra'},
  {id: 'C', title: 'Menos plazas,\nmás servicios', benefit: 'Más espacio por visita', cost: 'Menos entradas', note: 'Demanda de servicios:\npor validar', summary: 'Menos plazas, más servicios', summaryCost: 'Menos entradas'},
] as const;
export type Variant = 'base' | 'A' | 'B' | 'C';

export const FRIENDS = [
  {id: 'ines', skin: '#C68D6C', hair: '#35251F', shirt: '#E5DED1', trousers: '#374B58', height: 1.02, hairstyle: 'bob'},
  {id: 'dani', skin: '#80513A', hair: '#211E1E', shirt: '#D77E42', trousers: '#303944', height: 1.06, hairstyle: 'curly'},
  {id: 'sara', skin: '#D9A47C', hair: '#57372D', shirt: '#778782', trousers: '#303A49', height: .99, hairstyle: 'bun'},
  {id: 'pau', skin: '#E1B08A', hair: '#6B5240', shirt: '#ECE6DB', trousers: '#465B6A', height: 1.03, hairstyle: 'short'},
  {id: 'alex', skin: '#BE8667', hair: '#2B2526', shirt: '#353B48', trousers: '#8C816F', height: 1.07, hairstyle: 'quiff'},
] as const;
