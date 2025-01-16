import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { ImportFormat } from 'src/app/models/admin/formats.model';
import {
  selectFormats,
  selectFormatsError,
  selectLoadingFormats,
} from 'src/app/store/rti/admin/formats/formats.selectors';
import { EditFormatPage } from './format/format.page';
import { FormatActionCellRendererComponent } from './formatActionCellRenderComponent';
import { loadFormats } from 'src/app/store/rti/admin/formats/formats.actions';
import { AuthService } from 'src/app/auth/auth.service';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  formats: ImportFormat[];
  loading: boolean;
}

@Component({
  selector: 'app-formats',
  templateUrl: './formats.page.html',
  styleUrls: ['./formats.page.scss'],
})
export class FormatsPage implements OnInit, OnDestroy {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'formatDetails',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 50,
    },
    {
      field: 'button',
      cellRenderer: FormatActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  formats$ = this.store.select(selectFormats); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoadingFormats);
  error$ = this.store.select(selectFormatsError);

  onDestroy = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadFormats());

    this.vm$ = combineLatest([this.formats$, this.loading$]).pipe(
      map(([formats, loading]) => ({ formats, loading }))
    );
  }

  ngOnInit() {
    this.formats$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res) => console.log(res));
  }

  async editFormat() {
    this.store.dispatch(loadFormats());

    const modal = await this.modalController.create({
      component: EditFormatPage,
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
