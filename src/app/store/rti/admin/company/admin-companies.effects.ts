import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CompaniesService } from 'src/app/panels/RTI/admin/companys/admin-companies.service';

import {
  loadCompanies,
  loadCompaniesFailure,
  loadCompaniesSuccess,
  saveCompany,
  saveCompanyFailure,
  saveCompanySuccess,
} from './admin-companies.actions';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable()
export class AdminCompanyEffects {
  constructor(
    private actions$: Actions,
    private companiesService: CompaniesService,
    private modalController: ModalController,
    private readonly alertService: AlertService
  ) {}

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies),
      mergeMap(() =>
        this.companiesService.getCompanies().pipe(
          map((companies) =>
            loadCompaniesSuccess({ companies: companies.Companies })
          ),
          catchError((error) =>
            of(loadCompaniesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCompany),
      mergeMap((action) =>
        this.companiesService.saveCompany(action.company).pipe(
          map((savedCompany) => saveCompanySuccess({ company: savedCompany })),
          catchError((error) =>
            of(saveCompanyFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCompaniesOnSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCompanySuccess),
      tap(() => {
        this.alertService.success('Company saved successfully!');
        this.modalController.dismiss();
      }),
      map(() => loadCompanies())
    )
  );
}
