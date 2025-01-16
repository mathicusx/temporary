import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DepartmentsService } from 'src/app/panels/RTI/company/departments/departments.service';
import {
  loadDepartments,
  loadDepartmentsFailure,
  loadDepartmentsSuccess,
  saveDepartment,
  saveDepartmentFailure,
  saveDepartmentSuccess,
} from './departments.actions';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private departmentsService: DepartmentsService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDepartments),
      mergeMap(() =>
        this.departmentsService.getDepartments().pipe(
          map((departments) =>
            loadDepartmentsSuccess({ departments: departments.Departments })
          ),
          catchError((error) =>
            of(loadDepartmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveDepartment),
      mergeMap((action) =>
        this.departmentsService.saveDepartment(action.department).pipe(
          map((savedDepartment) =>
            saveDepartmentSuccess({ department: savedDepartment })
          ),
          catchError((error) =>
            of(saveDepartmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadDepartmentsOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveDepartmentSuccess),
      tap(() => {
        this.alertService.success('Department saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadDepartments())
    )
  );
}
