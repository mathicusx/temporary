import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminCompanyState } from './admin-companies.reducer';

export const selectCompaniesState =
  createFeatureSelector<AdminCompanyState>('adminCompanies');

export const selectCompanies = createSelector(
  selectCompaniesState,
  (state) => state.companies
);

export const selectLoadingCompanies = createSelector(
  selectCompaniesState,
  (state) => state.loadingCompanies
);

export const selectCompaniesError = createSelector(
  selectCompaniesState,
  (state) => state.error
);
