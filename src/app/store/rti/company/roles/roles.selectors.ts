import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleState } from './roles.reducer';

export const selectRolesState = createFeatureSelector<RoleState>('roles');

export const selectRoles = createSelector(
  selectRolesState,
  (state) => state.roles
);

export const selectLoadingRoles = createSelector(
  selectRolesState,
  (state) => state.loadingRoles
);

export const selectRolesError = createSelector(
  selectRolesState,
  (state) => state.error
);
