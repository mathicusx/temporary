import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { UsersReducer } from '../rti/hr/users/users.reducer';
import { authReducer } from '../auth/auth.reducer';
import { NiRatesReducer } from '../rti/admin/niRates/niRates.reducer';
import { FormatsReducer } from '../rti/admin/formats/formats.reducer';
import { AdminCompaniesReducer } from '../rti/admin/company/admin-companies.reducer';
import { DepartmentsReducer } from '../rti/company/departments/departments.reducer';
import { SitesReducer } from '../rti/company/sites/sites.reducer';
import { RolesReducer } from '../rti/company/roles/roles.reducer';
import { RegionsReducer } from '../rti/company/regions/regions.reducer';
import { globalVariablesReducers } from './global-variables/global-variables.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  users: UsersReducer,
  auth: authReducer,
  niRates: NiRatesReducer,
  formats: FormatsReducer,
  adminCompanies: AdminCompaniesReducer,
  departments: DepartmentsReducer,
  sites: SitesReducer,
  roles: RolesReducer,
  regions: RegionsReducer,
  globalVariables: globalVariablesReducers,
};
