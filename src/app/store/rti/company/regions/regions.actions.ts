import { createAction, props } from '@ngrx/store';
import { Region } from 'src/app/models/company/region.model';

const REGIONS = 'REGIONS';

export const loadRegions = createAction(`[Page ${REGIONS}] Get Regions`);
export const loadRegionsSuccess = createAction(
  `[Service ${REGIONS}] Get Regions Success`,
  props<{ regions: Region[] }>()
);
export const loadRegionsFailure = createAction(
  `[Service ${REGIONS}] Get Regions Failed`,
  props<{ error: string }>()
);
