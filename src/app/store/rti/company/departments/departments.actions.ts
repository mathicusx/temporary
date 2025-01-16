import { createAction, props } from '@ngrx/store';
import {
  Department,
  SaveDepartment,
} from 'src/app/models/company/department.model';

const DEPARTMENTS = 'DEPARTMENTS';

export const loadDepartments = createAction(
  `[Page ${DEPARTMENTS}] Get Departments`
);
export const loadDepartmentsSuccess = createAction(
  `[Service ${DEPARTMENTS}] Get Departments Success`,
  props<{ departments: Department[] }>()
);
export const loadDepartmentsFailure = createAction(
  `[Service ${DEPARTMENTS}] Get Departments Failed`,
  props<{ error: string }>()
);

export const saveDepartment = createAction(
  `[Page ${DEPARTMENTS}] Save Department`,
  props<{ department: SaveDepartment }>()
);
export const saveDepartmentSuccess = createAction(
  `[Page ${DEPARTMENTS}] Save Department Success`,
  props<{ department: SaveDepartment }>()
);
export const saveDepartmentFailure = createAction(
  `[Page ${DEPARTMENTS}] Save Department Failure`,
  props<{ error: string }>()
);
