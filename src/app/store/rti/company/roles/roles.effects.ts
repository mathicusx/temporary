import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadRoles,
  loadRolesFailure,
  loadRolesSuccess,
  saveRole,
  saveRoleFailure,
  saveRoleSuccess,
} from './roles.actions';
import { RolesService } from 'src/app/panels/RTI/company/roles/roles.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private RolesService: RolesService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRoles),
      mergeMap(() =>
        this.RolesService.getRoles().pipe(
          map((role) => loadRolesSuccess({ roles: role.Roles })),
          catchError((error) => of(loadRolesFailure({ error: error.message })))
        )
      )
    )
  );

  saveRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveRole),
      mergeMap((action) =>
        this.RolesService.saveRole(action.role).pipe(
          map((savedRole) => saveRoleSuccess({ role: savedRole })),
          catchError((error) => of(saveRoleFailure({ error: error.message })))
        )
      )
    )
  );

  loadRolesOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveRoleSuccess),
      tap(() => {
        this.alertService.success('Role saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadRoles())
    )
  );
}
