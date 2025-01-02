import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NiRatesService } from 'src/app/panels/RTI/admin/ni-rates/ni-rates.service';
import {
  loadNiRates,
  loadNiRatesFailure,
  loadNiRatesSuccess,
} from './niRates.actions';

@Injectable()
export class NiRateEffects {
  constructor(
    private actions$: Actions,
    private niRatesService: NiRatesService
  ) {}

  loadNiRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNiRates),
      mergeMap(() =>
        this.niRatesService.getNiRates().pipe(
          map((niRates) => loadNiRatesSuccess({ niRates: niRates })),
          catchError((error) =>
            of(loadNiRatesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
