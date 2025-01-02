import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadSites, loadSitesFailure, loadSitesSuccess } from './sites.actions';
import { SitesService } from 'src/app/panels/RTI/company/sites/sites.service';

@Injectable()
export class SiteEffects {
  constructor(private actions$: Actions, private SitesService: SitesService) {}

  loadSites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSites),
      mergeMap(() =>
        this.SitesService.getSites().pipe(
          map((sites) => loadSitesSuccess({ sites: sites })),
          catchError((error) => of(loadSitesFailure({ error: error.message })))
        )
      )
    )
  );
}
