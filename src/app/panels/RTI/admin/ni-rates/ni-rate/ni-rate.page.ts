import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NiRate } from 'src/app/models/admin/niRates.model';
import { AppState } from 'src/app/store/app/app.state';
import { saveNiRate } from 'src/app/store/rti/admin/niRates/niRates.actions';

interface NiRateForm {
  id: FormControl<number>;
  date_from: FormControl<string>;
  date_to: FormControl<string | null>;
  employer_rate: FormControl<number>;
  ni_free_amount: FormControl<number>;
  ni_free_amount_u21: FormControl<number>;
  apprentice_levy: FormControl<number>;
  pension_contribution_rate: FormControl<number>;
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
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.niRate = this.navParams.get('niRate');
    console.log(this.niRate);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editNiRateForm.value);
    const payload = this.editNiRateForm.value;

    this.store.dispatch(saveNiRate({ niRate: payload }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editNiRateForm = new FormGroup<NiRateForm>({
      id: new FormControl(this.niRate?.id ?? null),
      date_from: new FormControl(this.niRate?.dateFrom || '', [
        Validators.required,
      ]),
      date_to: new FormControl(this.niRate?.dateTo || null),
      employer_rate: new FormControl(this.niRate?.employerRate, [
        Validators.required,
      ]),
      ni_free_amount: new FormControl(this.niRate?.niFreeAmount, [
        Validators.required,
      ]),
      ni_free_amount_u21: new FormControl(this.niRate?.niFreeAmountU21, [
        Validators.required,
      ]),
      apprentice_levy: new FormControl(this.niRate?.apprenticeLevy, [
        Validators.required,
      ]),
      pension_contribution_rate: new FormControl(
        this.niRate?.pensionContributionRate,
        [Validators.required, Validators.min(0)]
      ),
    });
  }
}
