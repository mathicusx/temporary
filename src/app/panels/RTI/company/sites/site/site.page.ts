import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Site } from 'src/app/models/company/site.model';

interface SiteForm {
  id: FormControl<number>;
  name: FormControl<string>;
}

@Component({
  selector: 'app-site',
  templateUrl: './site.page.html',
  styleUrls: ['./site.page.scss'],
})
export class EditSitePage implements OnInit {
  editSiteForm: FormGroup;

  site: Site;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.site = this.navParams.get('site');
    console.log(this.site);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editSiteForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editSiteForm = new FormGroup<SiteForm>({
      id: new FormControl(this.site?.id || 0, [Validators.required]),
      name: new FormControl(this.site?.name || '', [Validators.required]),
    });
  }
}
