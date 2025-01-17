import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadImports,
  loadImportsFailure,
  loadImportsSuccess,
  saveImport,
  saveImportFailure,
  saveImportSuccess,
} from './imports.actions';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';
import { ImportsService } from 'src/app/panels/RTI/company/imports/imports.service';

@Injectable()
export class ImportEffects {
  constructor(
    private actions$: Actions,
    private ImportsService: ImportsService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadImports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadImports),
      mergeMap(() =>
        this.ImportsService.getImports().pipe(
          map((imports) => loadImportsSuccess({ imports: imports.Imports })),
          catchError((error) =>
            of(loadImportsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveImport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveImport),
      mergeMap((action) =>
        this.ImportsService.saveImport(action.import).pipe(
          map((savedImport) => saveImportSuccess({ import: savedImport })),
          catchError((error) => of(saveImportFailure({ error: error.message })))
        )
      )
    )
  );

  loadImportsOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveImportSuccess),
      tap(() => {
        this.alertService.success('Import saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadImports())
    )
  );
}
