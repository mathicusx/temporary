import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentState } from './departments.reducer';

export const selectDepartmentsState = createFeatureSelector<DepartmentState>('departments');

export const selectDepartments = createSelector(
  selectDepartmentsState,
  (state) => state.departments
);

export const selectLoadingDepartments = createSelector(
  selectDepartmentsState,
  (state) => state.loadingDepartments
);

export const selectDepartmentsError = createSelector(
  selectDepartmentsState,
  (state) => state.error
);
