import { createReducer, on } from '@ngrx/store';
import { loadRoles, loadRolesFailure, loadRolesSuccess } from './roles.actions';
import { Role } from 'src/app/models/company/role.model';

export interface RoleState {
  roles: Role[];
  loadingRoles: boolean;
  error: string | null;
}

export const initialRoleState: RoleState = {
  roles: [],
  loadingRoles: false,
  error: null,
};

export const RolesReducer = createReducer(
  initialRoleState,
  on(loadRoles, (state) => ({
    ...state,
    loadingRoles: true,
  })),
  on(loadRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
    loadingRoles: false,
  })),
  on(loadRolesFailure, (state, { error }) => ({
    ...state,
    error,
    loadingRoles: false,
  }))
);
