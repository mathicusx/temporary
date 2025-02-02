import { createAction, props } from '@ngrx/store';
import { SaveSite, Site } from 'src/app/models/company/site.model';

const SITES = 'SITES';

export const loadSites = createAction(`[Page ${SITES}] Get Sites`);
export const loadSitesSuccess = createAction(
  `[Service ${SITES}] Get Sites Success`,
  props<{ sites: Site[] }>()
);
export const loadSitesFailure = createAction(
  `[Service ${SITES}] Get Sites Failed`,
  props<{ error: string }>()
);

export const saveSite = createAction(
  `[Page ${SITES}] Save Site`,
  props<{ site: SaveSite }>()
);
export const saveSiteSuccess = createAction(
  `[Page ${SITES}] Save Site Success`,
  props<{ site: SaveSite }>()
);
export const saveSiteFailure = createAction(
  `[Page ${SITES}] Save Site Failure`,
  props<{ error: string }>()
);
