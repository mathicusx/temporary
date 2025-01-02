import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Region } from 'src/app/models/company/region.model';

interface RegionForm {
  id: FormControl<number>;
  name: FormControl<string>;
  inactive: FormControl<boolean>;
}

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class EditRegionPage implements OnInit {
  editRegionForm: FormGroup;

  region: Region;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.region = this.navParams.get('region');
    console.log(this.region);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editRegionForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editRegionForm = new FormGroup<RegionForm>({
      id: new FormControl(this.region?.id || 0, [Validators.required]),
      name: new FormControl(this.region?.name || '', [Validators.required]),
      inactive: new FormControl(this.region?.inactive || false, [
        Validators.required,
      ]),
    });
  }
}
