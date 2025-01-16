import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { NiRatesService } from 'src/app/panels/RTI/admin/ni-rates/ni-rates.service';
import {
  loadNiRates,
  loadNiRatesFailure,
  loadNiRatesSuccess,
  saveNiRate,
  saveNiRateFailure,
  saveNiRateSuccess,
} from './niRates.actions';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class NiRateEffects {
  constructor(
    private actions$: Actions,
    private niRatesService: NiRatesService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadNiRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNiRates),
      mergeMap(() =>
        this.niRatesService.getNiRates().pipe(
          map((niRates) => loadNiRatesSuccess({ niRates: niRates.NiRates })),
          catchError((error) =>
            of(loadNiRatesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveNiRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveNiRate),
      mergeMap((action) =>
        this.niRatesService.saveNiRate(action.niRate).pipe(
          map((savedNiRate) => saveNiRateSuccess({ niRate: savedNiRate })),
          catchError((error) => of(saveNiRateFailure({ error: error.message })))
        )
      )
    )
  );

  loadNiRatesOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveNiRateSuccess),
      tap(() => {
        this.alertService.success('Ni Rate saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadNiRates())
    )
  );
}
