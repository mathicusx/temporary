import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Department } from 'src/app/models/company/department.model';

interface DepartmentForm {
  id: FormControl<number>;
  name: FormControl<string>;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class EditDepartmentPage implements OnInit {
  editDepartmentForm: FormGroup;

  department: Department;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.department = this.navParams.get('department');
    console.log(this.department);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editDepartmentForm.value);
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editDepartmentForm = new FormGroup<DepartmentForm>({
      id: new FormControl(this.department?.id || 0, [Validators.required]),
      name: new FormControl(this.department?.name || '', [Validators.required]),
    });
  }
}
