// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app/app.state';
import { setGlobalLoader } from '../app/global-variables/global-variables.actions';
import { ModalController } from '@ionic/angular';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private modalController: ModalController
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((response) => loginSuccess({ token: response.token })),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.store.dispatch(setGlobalLoader({ active: false }));
          this.modalController.dismiss();
          this.router.navigate(['panels/rti/admin/dashboard']);
        })
      ),
    { dispatch: false }
  );
}
