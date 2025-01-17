import { AuthState } from '../auth/auth.reducer';
import { AdminCompanyState } from '../rti/admin/company/admin-companies.reducer';
import { FormatState } from '../rti/admin/formats/formats.reducer';
import { NiRateState } from '../rti/admin/niRates/niRates.reducer';
import { DepartmentState } from '../rti/company/departments/departments.reducer';
import { ImportState } from '../rti/company/imports/imports.reducer';
import { RegionState } from '../rti/company/regions/regions.reducer';
import { RoleState } from '../rti/company/roles/roles.reducer';
import { SiteState } from '../rti/company/sites/sites.reducer';
import { UsersState } from '../rti/hr/users/users.reducer';
import { GlobalVariablesState } from './global-variables/global-variables.reducer';

export interface AppState {
  users: UsersState;
  auth: AuthState;
  niRates: NiRateState;
  formats: FormatState;
  adminCompanies: AdminCompanyState;
  departments: DepartmentState;
  sites: SiteState;
  roles: RoleState;
  regions: RegionState;
  imports: ImportState;
  globalVariables: GlobalVariablesState;
}
