import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadRegions,
  loadRegionsFailure,
  loadRegionsSuccess,
  saveRegion,
  saveRegionFailure,
  saveRegionSuccess,
} from './regions.actions';
import { RegionsService } from 'src/app/panels/RTI/company/regions/regions.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ModalController } from '@ionic/angular';

@Injectable()
export class RegionEffects {
  constructor(
    private actions$: Actions,
    private RegionsService: RegionsService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRegions),
      mergeMap(() =>
        this.RegionsService.getRegions().pipe(
          map((region) => loadRegionsSuccess({ regions: region.Regions })),
          catchError((error) =>
            of(loadRegionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveRegion),
      mergeMap((action) =>
        this.RegionsService.saveRegion(action.region).pipe(
          map((savedRegion) => saveRegionSuccess({ region: savedRegion })),
          catchError((error) => of(saveRegionFailure({ error: error.message })))
        )
      )
    )
  );

  loadRegionsOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveRegionSuccess),
      tap(() => {
        this.alertService.success('Region saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadRegions())
    )
  );
}
