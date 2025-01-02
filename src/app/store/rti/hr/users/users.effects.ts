import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './users.actions';
import { UsersService } from 'src/app/panels/RTI/HR/users.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users: users })),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
}
