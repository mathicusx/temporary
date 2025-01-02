import { createAction, props } from '@ngrx/store';
import { Company } from 'src/app/models/admin/admin-company.model';

const COMPANIES = 'COMPANIES';

export const loadCompanies = createAction(`[Page ${COMPANIES}] Get Companies`);
export const loadCompaniesSuccess = createAction(
  `[Service ${COMPANIES}] Get Companies Success`,
  props<{ companies: Company[] }>()
);
export const loadCompaniesFailure = createAction(
  `[Service ${COMPANIES}] Get Companies Failed`,
  props<{ error: string }>()
);
