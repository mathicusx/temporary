import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/models/company/role.model';

const ROLES = 'ROLES';

export const loadRoles = createAction(`[Page ${ROLES}] Get Roles`);
export const loadRolesSuccess = createAction(
  `[Service ${ROLES}] Get Roles Success`,
  props<{ roles: Role[] }>()
);
export const loadRolesFailure = createAction(
  `[Service ${ROLES}] Get Roles Failed`,
  props<{ error: string }>()
);
