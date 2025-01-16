import { createAction, props } from '@ngrx/store';
import { Role, SaveRole } from 'src/app/models/company/role.model';

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

export const saveRole = createAction(
  `[Page ${ROLES}] Save Role`,
  props<{ role: SaveRole }>()
);
export const saveRoleSuccess = createAction(
  `[Page ${ROLES}] Save Role Success`,
  props<{ role: SaveRole }>()
);
export const saveRoleFailure = createAction(
  `[Page ${ROLES}] Save Role Failure`,
  props<{ error: string }>()
);
