import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { NiRate } from 'src/app/models/admin/niRates.model';

interface NiRateForm {
  id: FormControl<number>;
  dateFrom: FormControl<string>;
  dateTo: FormControl<string | null>;
  employerRate: FormControl<number>;
  niFreeAmount: FormControl<number>;
  niFreeAmountU21: FormControl<number>;
  apprenticeLevy: FormControl<number>;
  pensionContributionRate: FormControl<number>;
}

@Component({
  selector: 'app-ni-rate',
  templateUrl: './ni-rate.page.html',
  styleUrls: ['./ni-rate.page.scss'],
})
export class EditNiRatePage implements OnInit {
  editNiRateForm: FormGroup;

  niRate: NiRate;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.niRate = this.navParams.get('niRate');
    console.log(this.niRate);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editNiRateForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editNiRateForm = new FormGroup<NiRateForm>({
      id: new FormControl(this.niRate?.id || 0, [Validators.required]),
      dateFrom: new FormControl(this.niRate?.dateFrom || '', [
        Validators.required,
      ]),
      dateTo: new FormControl(this.niRate?.dateTo || null),
      employerRate: new FormControl(this.niRate?.employerRate || 0, [
        Validators.required,
      ]),
      niFreeAmount: new FormControl(this.niRate?.niFreeAmount || 0, [
        Validators.required,
      ]),
      niFreeAmountU21: new FormControl(this.niRate?.niFreeAmountU21 || 0, [
        Validators.required,
      ]),
      apprenticeLevy: new FormControl(this.niRate?.apprenticeLevy || 0, [
        Validators.required,
      ]),
      pensionContributionRate: new FormControl(
        this.niRate?.pensionContributionRate || 0,
        [Validators.required, Validators.min(0)]
      ),
    });
  }
}
