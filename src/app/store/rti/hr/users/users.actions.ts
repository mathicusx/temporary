import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/rti/users.model';

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
