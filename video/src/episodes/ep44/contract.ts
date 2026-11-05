// Delivery contract only. This episode is not implemented or registered.
import {delivery} from '../../shared/brand/tokens';

export const episode = {
  id: 44,
  title: 'Licencia y contratos antes de movilizar',
  compositionId: 'NouMestalla44LicenciaContratosDecision',
  outputFile: 'Nou_Mestalla_44_Licencia_Contratos_Decision_59s.mp4',
  prompt: 'Prompt_Codex_Nou_Mestalla_44_Licencia_y_Contratos.txt',
  status: 'not-produced',
  ...delivery,
} as const;
