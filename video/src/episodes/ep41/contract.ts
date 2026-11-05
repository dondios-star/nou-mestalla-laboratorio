// Delivery contract only. This episode is not implemented or registered.
import {delivery} from '../../shared/brand/tokens';

export const episode = {
  id: 41,
  title: 'Financiación antes de iniciar',
  compositionId: 'NouMestalla41Decision',
  outputFile: 'Nou_Mestalla_41_Decision_59s.mp4',
  prompt: 'Prompt_Codex_Nou_Mestalla_41.txt',
  status: 'not-produced',
  ...delivery,
} as const;
