import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CompaniesService } from 'src/app/panels/RTI/admin/companys/admin-companies.service';

import {
  loadCompanies,
  loadCompaniesFailure,
  loadCompaniesSuccess,
} from './admin-companies.actions';

@Injectable()
export class AdminCompanyEffects {
  constructor(
    private actions$: Actions,
    private companiesService: CompaniesService
  ) {}

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies),
      mergeMap(() =>
        this.companiesService.getCompanies().pipe(
          map((companies) => loadCompaniesSuccess({ companies: companies })),
          catchError((error) =>
            of(loadCompaniesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
