import { createAction, props } from '@ngrx/store';
import { Region, SaveRegion } from 'src/app/models/company/region.model';

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

export const saveRegion = createAction(
  `[Page ${REGIONS}] Save Region`,
  props<{ region: SaveRegion }>()
);
export const saveRegionSuccess = createAction(
  `[Page ${REGIONS}] Save Region Success`,
  props<{ region: SaveRegion }>()
);
export const saveRegionFailure = createAction(
  `[Page ${REGIONS}] Save Region Failure`,
  props<{ error: string }>()
);
