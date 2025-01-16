import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadSites,
  loadSitesFailure,
  loadSitesSuccess,
  saveSite,
  saveSiteFailure,
  saveSiteSuccess,
} from './sites.actions';
import { SitesService } from 'src/app/panels/RTI/company/sites/sites.service';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class SiteEffects {
  constructor(
    private actions$: Actions,
    private SitesService: SitesService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSites),
      mergeMap(() =>
        this.SitesService.getSites().pipe(
          map((sites) => loadSitesSuccess({ sites: sites.Sites })),
          catchError((error) => of(loadSitesFailure({ error: error.message })))
        )
      )
    )
  );

  saveSite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSite),
      mergeMap((action) =>
        this.SitesService.saveSite(action.site).pipe(
          map((savedSite) => saveSiteSuccess({ site: savedSite })),
          catchError((error) => of(saveSiteFailure({ error: error.message })))
        )
      )
    )
  );

  loadSitesOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSiteSuccess),
      tap(() => {
        this.alertService.success('Site saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadSites())
    )
  );
}
