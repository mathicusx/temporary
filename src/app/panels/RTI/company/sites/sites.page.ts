import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, combineLatest, map } from 'rxjs';
import { SiteActionCellRendererComponent } from './siteActionCellRenderComponent';
import { Site } from 'src/app/models/company/site.model';
import { EditSitePage } from './site/site.page';
import { loadSites } from 'src/app/store/rti/company/sites/sites.actions';
import {
  selectSites,
  selectLoadingSites,
  selectSitesError,
} from 'src/app/store/rti/company/sites/sites.selectors';
import { AppState } from 'src/app/store/app/app.state';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  sites: Site[];
  loading: boolean;
}

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'button',
      cellRenderer: SiteActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  sites$ = this.store.select(selectSites); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoadingSites);
  error$ = this.store.select(selectSitesError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadSites());

    this.vm$ = combineLatest([this.sites$, this.loading$]).pipe(
      map(([sites, loading]) => ({ sites, loading }))
    );
  }

  ngOnInit() {
    this.sites$.subscribe((res) => console.log(res));
  }

  async editSite() {
    const modal = await this.modalController.create({
      component: EditSitePage,
    });
    return await modal.present();
  }
}
