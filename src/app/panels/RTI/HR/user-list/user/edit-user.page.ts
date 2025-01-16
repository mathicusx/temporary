import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Company, SaveUser, User } from 'src/app/models/rti/users.model';
import { AppState } from 'src/app/store/app/app.state';
import { loadCompanies } from 'src/app/store/rti/admin/company/admin-companies.actions';
import { selectCompanies } from 'src/app/store/rti/admin/company/admin-companies.selectors';
import { saveUser } from 'src/app/store/rti/hr/users/users.actions';

interface Form {
  id: FormControl<number>;
  name: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<number>;
  roles: FormControl<string[]>;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  editUserForm: FormGroup;

  user: User;

  companies$ = this.store.select(selectCompanies);

  roleOptions = [
    { id: 'ROLE_ADMIN', name: 'Admin' },
    { id: 'ROLE_COMPANY', name: 'Company' },
    { id: 'ROLE_USER', name: 'User' },
  ];
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadCompanies());
    this.user = this.navParams.get('user');
    console.log(this.user);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    if (!this.editUserForm.valid) {
      this.editUserForm.markAllAsTouched();
      return;
    }
    const user: SaveUser = {
      ...this.editUserForm.value,
      roles: this.editUserForm.controls.roles.value?.length
        ? [this.editUserForm.controls.roles.value]
        : null,
    };
    console.log(user);

    this.store.dispatch(saveUser({ user: user }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editUserForm = new FormGroup<Form>({
      id: new FormControl(this.user?.id ?? null),
      name: new FormControl(this.user?.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.user?.email, [
        Validators.required,
        Validators.email,
      ]),
      company: new FormControl(this.user?.company?.id),
      roles: new FormControl(this.user?.roles, []),
    });
  }
}
