import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadFormats,
  loadFormatsFailure,
  loadFormatsSuccess,
  saveFormat,
  saveFormatFailure,
  saveFormatSuccess,
} from './formats.actions';
import { FormatsService } from 'src/app/panels/RTI/admin/formats/formats.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ModalController } from '@ionic/angular';

@Injectable()
export class FormatEffects {
  constructor(
    private actions$: Actions,
    private formatsService: FormatsService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadFormats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFormats),
      mergeMap(() =>
        this.formatsService.getFormats().pipe(
          map((formats) =>
            loadFormatsSuccess({ formats: formats.ImportFormats })
          ),
          catchError((error) =>
            of(loadFormatsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveFormat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFormat),
      mergeMap((action) =>
        this.formatsService.saveFormat(action.format).pipe(
          map((savedFormat) => saveFormatSuccess({ format: savedFormat })),
          catchError((error) => of(saveFormatFailure({ error: error.message })))
        )
      )
    )
  );

  loadFormatsOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveFormatSuccess),
      tap(() => {
        this.alertService.success('Format saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadFormats())
    )
  );
}
