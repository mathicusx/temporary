import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app/app.state';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, combineLatest, map } from 'rxjs';
import { Region } from 'src/app/models/company/region.model';
import { EditRegionPage } from './region/region.page';
import { RegionActionCellRendererComponent } from './regionActionCellRenderComponent';
import { selectLoadingRegions, selectRegions, selectRegionsError } from 'src/app/store/rti/company/regions/regions.selectors';
import { loadRegions } from 'src/app/store/rti/company/regions/regions.actions';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  regions: Region[];
  loading: boolean;
}

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'inactive',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 50,
    },
    {
      field: 'button',
      cellRenderer: RegionActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  regions$ = this.store.select(selectRegions); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoadingRegions);
  error$ = this.store.select(selectRegionsError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadRegions());

    this.vm$ = combineLatest([this.regions$, this.loading$]).pipe(
      map(([regions, loading]) => ({ regions, loading }))
    );
  }

  ngOnInit() {
    this.regions$.subscribe((res) => console.log(res));
  }

  async editRegion() {
    const modal = await this.modalController.create({
      component: EditRegionPage,
    });
    return await modal.present();
  }
}
