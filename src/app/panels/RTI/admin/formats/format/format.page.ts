import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ImportFormat } from 'src/app/models/admin/formats.model';
import { NiRate } from 'src/app/models/admin/niRates.model';
import { AppState } from 'src/app/store/app/app.state';
import { saveFormat } from 'src/app/store/rti/admin/formats/formats.actions';

interface FormatForm {
  id: FormControl<number>;
  name: FormControl<string>;
  formatDetails: FormControl<string>;
}

@Component({
  selector: 'app-format',
  templateUrl: './format.page.html',
  styleUrls: ['./format.page.scss'],
})
export class EditFormatPage implements OnInit {
  editFormatForm: FormGroup;

  format: ImportFormat;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.format = this.navParams.get('format');
    console.log(this.format);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editFormatForm.value);
    const format = this.editFormatForm.value;
    
    

    this.store.dispatch(saveFormat({ format: format }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editFormatForm = new FormGroup<FormatForm>({
      id: new FormControl(this.format?.id ?? null),
      name: new FormControl(this.format?.name || '', [Validators.required]),
      formatDetails: new FormControl(this.format?.formatDetails || '', [
        Validators.required,
      ]),
    });
  }
}
