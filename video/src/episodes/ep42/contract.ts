// Delivery contract only. This episode is not implemented or registered.
import {delivery} from '../../shared/brand/tokens';

export const episode = {
  id: 42,
  title: 'Revisión antes del reinicio',
  compositionId: 'NouMestalla42ReinicioDecision',
  outputFile: 'Nou_Mestalla_42_Reinicio_Decision_59s.mp4',
  prompt: 'Prompt_Codex_Nou_Mestalla_42_Reinicio.txt',
  status: 'not-produced',
  ...delivery,
} as const;
