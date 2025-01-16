import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Department } from 'src/app/models/company/department.model';
import { AppState } from 'src/app/store/app/app.state';
import { saveDepartment } from 'src/app/store/rti/company/departments/departments.actions';

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
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.department = this.navParams.get('department');
    console.log(this.department);
  }

  ngOnInit() {
    this.initForm();
  }

  onEdit() {
    console.log(this.editDepartmentForm.value);
    const department = this.editDepartmentForm.value;

    this.store.dispatch(saveDepartment({ department: department }));
  }

  onClose() {
    this.modalController.dismiss();
  }

  private initForm() {
    this.editDepartmentForm = new FormGroup<DepartmentForm>({
      id: new FormControl(this.department?.id ?? null),
      name: new FormControl(this.department?.name || '', [Validators.required]),
    });
  }
}
