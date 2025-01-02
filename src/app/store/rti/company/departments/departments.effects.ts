import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DepartmentsService } from 'src/app/panels/RTI/company/departments/departments.service';
import {
  loadDepartments,
  loadDepartmentsFailure,
  loadDepartmentsSuccess,
} from './departments.actions';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private departmentsService: DepartmentsService
  ) {}

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDepartments),
      mergeMap(() =>
        this.departmentsService.getDepartments().pipe(
          map((departments) =>
            loadDepartmentsSuccess({ departments: departments })
          ),
          catchError((error) =>
            of(loadDepartmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
