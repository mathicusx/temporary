import { createReducer, on } from '@ngrx/store';
import { loadDepartments, loadDepartmentsFailure, loadDepartmentsSuccess } from './departments.actions';
import { Department } from 'src/app/models/company/department.model';

export interface DepartmentState {
  departments: Department[];
  loadingDepartments: boolean;
  error: string | null;
}

export const initialDepartmentState: DepartmentState = {
  departments: [],
  loadingDepartments: false,
  error: null,
};

export const DepartmentsReducer = createReducer(
  initialDepartmentState,
  on(loadDepartments, (state) => ({
    ...state,
    loadingDepartments: true,
  })),
  on(loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    departments,
    loadingDepartments: false,
  })),
  on(loadDepartmentsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingDepartments: false,
  }))
);
