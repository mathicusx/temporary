import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/models/company/role.model';
import { SaveSite, Site } from 'src/app/models/company/site.model';
import { AppState } from 'src/app/store/app/app.state';
import { loadRegions } from 'src/app/store/rti/company/regions/regions.actions';
import { selectRegions } from 'src/app/store/rti/company/regions/regions.selectors';
import { loadRoles } from 'src/app/store/rti/company/roles/roles.actions';
import { selectRoles } from 'src/app/store/rti/company/roles/roles.selectors';
import { saveSite } from 'src/app/store/rti/company/sites/sites.actions';

interface SiteForm {
  id: FormControl<number>;
  name: FormControl<string>;
  region: FormControl<number>;
  roles: FormControl<number[]>;
}

@Component({
  selector: 'app-site',
  templateUrl: './site.page.html',
  styleUrls: ['./site.page.scss'],
})
export class EditSitePage implements OnInit {
  editSiteForm: FormGroup;

  site: Site;

  regions$ = this.store.select(selectRegions);
  roles$ = this.store.select(selectRoles);

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadRegions());
    this.store.dispatch(loadRoles());

    this.site = this.navParams.get('site');
    console.log(this.site);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    if (!this.editSiteForm.valid) {
      this.editSiteForm.markAllAsTouched();
      return;
    }
    console.log(this.editSiteForm.value.roles);
    const site: SaveSite = {
      ...this.editSiteForm.value,
      // roles: this.editSiteForm.controls.roles.value
      //   ? [this.editSiteForm.controls.roles.value]
      //   : null,
    };
    console.log(site);

    this.store.dispatch(saveSite({ site: site }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    const siteIds = this.site?.roles?.map((role) => role.id) || [];
    this.editSiteForm = new FormGroup<SiteForm>({
      id: new FormControl(this.site?.id ?? null),
      name: new FormControl(this.site?.name, [Validators.required]),
      region: new FormControl(this.site?.region?.id),
      roles: new FormControl(siteIds),
    });
  }
}
