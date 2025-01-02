import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadRegions,
  loadRegionsFailure,
  loadRegionsSuccess,
} from './regions.actions';
import { RegionsService } from 'src/app/panels/RTI/company/regions/regions.service';

@Injectable()
export class RegionEffects {
  constructor(
    private actions$: Actions,
    private RegionsService: RegionsService
  ) {}

  loadRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRegions),
      mergeMap(() =>
        this.RegionsService.getRegions().pipe(
          map((regions) => loadRegionsSuccess({ regions: regions })),
          catchError((error) =>
            of(loadRegionsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
