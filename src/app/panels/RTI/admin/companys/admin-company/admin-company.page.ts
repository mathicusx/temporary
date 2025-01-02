import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Company } from 'src/app/models/admin/admin-company.model';

interface CompanyForm {
  id: FormControl<number>;
  name: FormControl<string>;
}

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.page.html',
  styleUrls: ['./admin-company.page.scss'],
})
export class EditAdminCompanyPage implements OnInit {
  editCompanyForm: FormGroup;

  company: Company;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.company = this.navParams.get('company');
    console.log(this.company);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editCompanyForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editCompanyForm = new FormGroup<CompanyForm>({
      id: new FormControl(this.company?.id || 0, [Validators.required]),
      name: new FormControl(this.company?.name || '', [Validators.required]),
    });
  }
}
