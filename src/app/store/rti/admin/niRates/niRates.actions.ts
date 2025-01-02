import { createAction, props } from '@ngrx/store';
import { NiRate } from 'src/app/models/admin/niRates.model';

const NIRATES = 'NIRATES';

export const loadNiRates = createAction(`[Page ${NIRATES}] Get Ni Rates`);
export const loadNiRatesSuccess = createAction(
  `[Service ${NIRATES}] Get Ni Rates Success`,
  props<{ niRates: NiRate[] }>()
);
export const loadNiRatesFailure = createAction(
  `[Service ${NIRATES}] Get Ni Rates Failed`,
  props<{ error: string }>()
);
