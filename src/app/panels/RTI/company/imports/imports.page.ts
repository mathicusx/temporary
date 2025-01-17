import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app/app.state';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, combineLatest, map } from 'rxjs';
import { CompanyService } from '../company.service';
import { ImportsActionCellRendererComponent } from './importsActionCellRenderComponent';
import {
  selectImports,
  selectImportsError,
  selectLoadingImports,
} from 'src/app/store/rti/company/imports/imports.selectors';
import { Import } from 'src/app/models/company/imports.model';
import { loadImports } from 'src/app/store/rti/company/imports/imports.actions';
import { EditImportPage } from './import/import.page';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  imports: Import[];
  loading: boolean;
}

@Component({
  selector: 'app-imports',
  templateUrl: './imports.page.html',
  styleUrls: ['./imports.page.scss'],
})
export class ImportsPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  companyId: number | null = null;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'site.name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    { field: 'notes', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'agency.name',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 50,
    },
    {
      field: 'fileType',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 50,
    },
    {
      field: 'uploadDatetime',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 50,
    },

    {
      field: 'button',
      cellRenderer: ImportsActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  imports$ = this.store.select(selectImports);
  loading$ = this.store.select(selectLoadingImports);
  error$ = this.store.select(selectImportsError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private companyService: CompanyService
  ) {
    this.store.dispatch(loadImports());

    this.vm$ = combineLatest([this.imports$, this.loading$]).pipe(
      map(([imports, loading]) => ({ imports, loading }))
    );
  }

  ngOnInit() {
    this.companyService.company$.subscribe((companyId) => {
      this.companyId = companyId;
      console.log('Received company ID:', this.companyId);
    });
  }

  async editImport() {
    const modal = await this.modalController.create({
      component: EditImportPage,
    });
    return await modal.present();
  }
}
