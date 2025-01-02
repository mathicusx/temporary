import { createReducer, on } from '@ngrx/store';
import { Company } from 'src/app/models/admin/admin-company.model';
import {
  loadCompanies,
  loadCompaniesFailure,
  loadCompaniesSuccess,
} from './admin-companies.actions';

export interface AdminCompanyState {
  companies: Company[];
  loadingCompanies: boolean;
  error: string | null;
}

export const initialCompaniesState: AdminCompanyState = {
  companies: [],
  loadingCompanies: false,
  error: null,
};

export const AdminCompaniesReducer = createReducer(
  initialCompaniesState,
  on(loadCompanies, (state) => ({
    ...state,
    loadingCompanies: true,
  })),
  on(loadCompaniesSuccess, (state, { companies }) => ({
    ...state,
    companies,
    loadingCompanies: false,
  })),
  on(loadCompaniesFailure, (state, { error }) => ({
    ...state,
    error,
    loadingCompanies: false,
  }))
);
