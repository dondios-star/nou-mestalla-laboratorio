// Delivery contract for the implemented episode; see its QA report.
import {delivery} from '../../shared/brand/tokens';

export const episode = {
  id: 45,
  title: 'Aforo, comodidad y ampliación',
  compositionId: 'NouMestalla45AforoDecision',
  outputFile: 'Nou_Mestalla_45_Aforo_Decision_59s.mp4',
  prompt: 'Prompt_Codex_Nou_Mestalla_45_Aforo.txt',
  status: 'implemented',
  ...delivery,
} as const;
