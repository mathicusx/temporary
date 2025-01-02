import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, combineLatest, map } from 'rxjs';
import { loadFormats } from 'src/app/store/rti/admin/formats/formats.actions';

import { FormatActionCellRendererComponent } from '../formats/formatActionCellRenderComponent';
import { Company } from 'src/app/models/admin/admin-company.model';
import {
  selectCompanies,
  selectCompaniesError,
  selectLoadingCompanies,
} from 'src/app/store/rti/admin/company/admin-companies.selectors';
import { EditAdminCompanyPage } from './admin-company/admin-company.page';
import { loadCompanies } from 'src/app/store/rti/admin/company/admin-companies.actions';
import { AdminCompanyActionCellRendererComponent } from './adminCompaniesActionCellRenderComponent';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  companies: Company[];
  loading: boolean;
}

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.page.html',
  styleUrls: ['./admin-companies.page.scss'],
})
export class AdminCompaniesPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'button',
      cellRenderer: AdminCompanyActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  companies$ = this.store.select(selectCompanies); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoadingCompanies);
  error$ = this.store.select(selectCompaniesError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadCompanies());

    this.vm$ = combineLatest([this.companies$, this.loading$]).pipe(
      map(([companies, loading]) => ({ companies, loading }))
    );
  }

  ngOnInit() {
    this.companies$.subscribe((res) => console.log(res));
  }

  async editCompany() {
    const modal = await this.modalController.create({
      component: EditAdminCompanyPage,
    });
    return await modal.present();
  }
}
