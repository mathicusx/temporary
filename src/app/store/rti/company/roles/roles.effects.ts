import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadRoles, loadRolesFailure, loadRolesSuccess } from './roles.actions';
import { RolesService } from 'src/app/panels/RTI/company/roles/roles.service';

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, private RolesService: RolesService) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRoles),
      mergeMap(() =>
        this.RolesService.getRoles().pipe(
          map((roles) => loadRolesSuccess({ roles: roles })),
          catchError((error) => of(loadRolesFailure({ error: error.message })))
        )
      )
    )
  );
}
