import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Role } from 'src/app/models/company/role.model';

interface RoleForm {
  id: FormControl<number>;
  name: FormControl<string>;
  company: FormControl<number>;
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
    private modalController: ModalController
  ) {
    this.role = this.navParams.get('role');
    console.log(this.role);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editRoleForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editRoleForm = new FormGroup<RoleForm>({
      id: new FormControl(this.role?.id || 0, [Validators.required]),
      name: new FormControl(this.role?.name || '', [Validators.required]),
      company: new FormControl(this.role?.company || 0, [Validators.required]),
    });
  }
}
