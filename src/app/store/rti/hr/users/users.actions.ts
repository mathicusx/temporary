import { createAction, props } from '@ngrx/store';
import { SaveUser, User } from 'src/app/models/rti/users.model';

const USERS = 'USERS';

export const loadUsers = createAction(`[Page ${USERS}] Get Users`);
export const loadUsersSuccess = createAction(
  `[Service ${USERS}] Get Users Success`,
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  `[Service ${USERS}] Get Users Failed`,
  props<{ error: string }>()
);

export const saveUser = createAction(
  `[Page ${USERS}] Save User`,
  props<{ user: SaveUser }>()
);
export const saveUserSuccess = createAction(
  `[Page ${USERS}] Save User Success`,
  props<{ user: SaveUser }>()
);
export const saveUserFailure = createAction(
  `[Page ${USERS}] Save User Failure`,
  props<{ error: string }>()
);
