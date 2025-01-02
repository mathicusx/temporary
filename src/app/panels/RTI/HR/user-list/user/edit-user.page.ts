import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Company, User } from 'src/app/models/rti/users.model';

interface Form {
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

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.user = this.navParams.get('user');
    console.log(this.user);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editUserForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editUserForm = new FormGroup<Form>({
      name: new FormControl(this.user?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.user?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      company: new FormControl(this.user?.company.id, [
        Validators.required,
        Validators.minLength(3),
      ]),
      roles: new FormControl(this.user?.roles || [], [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }
}
