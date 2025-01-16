import { createAction, props } from '@ngrx/store';
import { Company, SaveCompany } from 'src/app/models/admin/admin-company.model';

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

export const saveCompany = createAction(
  `[Page ${COMPANIES}] Save Company`,
  props<{ company: SaveCompany }>()
);
export const saveCompanySuccess = createAction(
  `[Page ${COMPANIES}] Save Company Success`,
  props<{ company: SaveCompany }>()
);
export const saveCompanyFailure = createAction(
  `[Page ${COMPANIES}] Save Company Failure`,
  props<{ error: string }>()
);
