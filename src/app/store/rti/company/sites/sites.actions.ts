import { createAction, props } from '@ngrx/store';
import { Site } from 'src/app/models/company/site.model';

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
