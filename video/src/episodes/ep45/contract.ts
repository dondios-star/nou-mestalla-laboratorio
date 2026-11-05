// Delivery contract only. This episode is not implemented or registered.
import {delivery} from '../../shared/brand/tokens';

export const episode = {
  id: 45,
  title: 'Aforo, comodidad y ampliación',
  compositionId: 'NouMestalla45AforoDecision',
  outputFile: 'Nou_Mestalla_45_Aforo_Decision_59s.mp4',
  prompt: 'Prompt_Codex_Nou_Mestalla_45_Aforo.txt',
  status: 'not-produced',
  ...delivery,
} as const;
