import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/models/company/role.model';
import { AppState } from 'src/app/store/app/app.state';
import { saveRole } from 'src/app/store/rti/company/roles/roles.actions';

interface RoleForm {
  id: FormControl<number>;
  name: FormControl<string>;
  // company: FormControl<number>;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
})
export class EditRolePage implements OnInit {
  editRoleForm: FormGroup;

  role: Role;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.role = this.navParams.get('role');
    console.log(this.role);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    const role = this.editRoleForm.value;

    this.store.dispatch(saveRole({ role: role }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editRoleForm = new FormGroup<RoleForm>({
      id: new FormControl(this.role?.id ?? null),
      name: new FormControl(this.role?.name || '', [Validators.required]),
      // company: new FormControl(this.role?.company || 0, [Validators.required]),
    });
  }
}
