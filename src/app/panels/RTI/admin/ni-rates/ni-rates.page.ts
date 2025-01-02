import { Component, OnInit } from '@angular/core';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { combineLatest, map, Observable } from 'rxjs';
import { NiRate } from 'src/app/models/admin/niRates.model';
import { NiRateActionCellRendererComponent } from './niRateActionCellRenderComponent';
import {
  selectLoadingNiRates,
  selectNiRates,
  selectNiRatesError,
} from 'src/app/store/rti/admin/niRates/niRates.selectors';
import { AppState } from 'src/app/store/app/app.state';
import { Store } from '@ngrx/store';
import { ModalController } from '@ionic/angular';
import { loadNiRates } from 'src/app/store/rti/admin/niRates/niRates.actions';
import { EditNiRatePage } from './ni-rate/ni-rate.page';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  niRates: NiRate[];
  loading: boolean;
}
@Component({
  selector: 'app-ni-rates',
  templateUrl: './ni-rates.page.html',
  styleUrls: ['./ni-rates.page.scss'],
})
export class NiRatesPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'dateFrom', sortable: true, filter: true, flex: 1, minWidth: 50 },
    { field: 'dateTo', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'employerRate',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'NiFreeAmount',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'NiFreeAmountU21',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'apprenticeLevy',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'pensionContributionRate',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'button',
      cellRenderer: NiRateActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  niRates$ = this.store.select(selectNiRates); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoadingNiRates);
  error$ = this.store.select(selectNiRatesError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadNiRates());

    this.vm$ = combineLatest([this.niRates$, this.loading$]).pipe(
      map(([niRates, loading]) => ({ niRates, loading }))
    );
  }

  ngOnInit() {
    this.niRates$.subscribe((res) => console.log(res));
  }

  async editNiRate() {
    const modal = await this.modalController.create({
      component: EditNiRatePage,
    });
    return await modal.present();
  }
}
