import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Format } from 'src/app/models/admin/formats.model';
import { NiRate } from 'src/app/models/admin/niRates.model';

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

  format: Format;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.format = this.navParams.get('format');
    console.log(this.format);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editFormatForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editFormatForm = new FormGroup<FormatForm>({
      id: new FormControl(this.format?.id || 0, [Validators.required]),
      name: new FormControl(this.format?.name || '', [Validators.required]),
      formatDetails: new FormControl(this.format?.formatDetails || '', [
        Validators.required,
      ]),
    });
  }
}
