import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Import, SaveImport } from 'src/app/models/company/imports.model';
import { AppState } from 'src/app/store/app/app.state';
import { loadFormats } from 'src/app/store/rti/admin/formats/formats.actions';
import { selectFormats } from 'src/app/store/rti/admin/formats/formats.selectors';
import {
  loadImports,
  saveImport,
} from 'src/app/store/rti/company/imports/imports.actions';
import { selectImports } from 'src/app/store/rti/company/imports/imports.selectors';
import { loadSites } from 'src/app/store/rti/company/sites/sites.actions';
import { selectSites } from 'src/app/store/rti/company/sites/sites.selectors';

interface ImportForm {
  id: FormControl<number>;
  site: FormControl<string | number>;
  agency: FormControl<string | number>;
  format: FormControl<string | number>;
  notes?: FormControl<string>;
  weekEnding: FormControl<string>;
}

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class EditImportPage implements OnInit {
  editImportForm: FormGroup;

  formats$ = this.store.select(selectFormats);
  sites$ = this.store.select(selectSites);
  agencyOptions = [{ id: '1', name: 'Agency 1' }];
  import: Import;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadImports());
    this.store.dispatch(loadFormats());
    this.store.dispatch(loadSites());
    // this.store.dispatch(loadAgency())
    this.import = this.navParams.get('import');
    console.log(this.import);
  }

  ngOnInit() {
    
    this.initForm();
  }

  onEdit() {
    console.log(this.editImportForm.value);
    const dataImport = this.editImportForm.value;

    this.store.dispatch(saveImport({ import: dataImport }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editImportForm = new FormGroup<ImportForm>({
      id: new FormControl(this.import?.id ?? null),
      site: new FormControl(this.import?.site?.id || '', [Validators.required]),
      agency: new FormControl(1),
      format: new FormControl(this.import?.format?.id || '', [
        Validators.required,
      ]),
      notes: new FormControl(this.import?.notes),
      weekEnding: new FormControl(this.import?.weekEnding, [
        Validators.required,
      ]),
    });
  }
}
