import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  saveUser,
  saveUserFailure,
  saveUserSuccess,
} from './users.actions';
import { UsersService } from 'src/app/panels/RTI/HR/users.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users: users.Users })),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveUser),
      mergeMap((action) =>
        this.usersService.saveUser(action.user).pipe(
          map((savedUser) => saveUserSuccess({ user: savedUser })),
          catchError((error) => of(saveUserFailure({ error: error.message })))
        )
      )
    )
  );

  loadUsersOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveUserSuccess),
      tap(() => {
        this.alertService.success('User saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadUsers())
    )
  );
}
