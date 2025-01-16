import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Region } from 'src/app/models/company/region.model';
import { AppState } from 'src/app/store/app/app.state';
import { saveRegion } from 'src/app/store/rti/company/regions/regions.actions';

interface RegionForm {
  id: FormControl<number>;
  name: FormControl<string>;
  // inactive?: FormControl<boolean>;
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
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.region = this.navParams.get('region');
    console.log(this.region);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editRegionForm.value);
    const region = this.editRegionForm.value;

    this.store.dispatch(saveRegion({ region: region }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editRegionForm = new FormGroup<RegionForm>({
      id: new FormControl(this.region?.id ?? null),
      name: new FormControl(this.region?.name || '', [Validators.required]),
      // inactive: new FormControl(this.region?.inactive || false, [
      //   Validators.required,
      // ]),
    });
  }
}
