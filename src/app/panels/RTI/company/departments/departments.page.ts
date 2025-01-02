import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app/app.state';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, combineLatest, map } from 'rxjs';
import { Department } from 'src/app/models/company/department.model';
import { DepartmentActionCellRendererComponent } from './departmentActionCellRenderComponent';
import { EditDepartmentPage } from './department/department.page';
import { loadDepartments } from 'src/app/store/rti/company/departments/departments.actions';
import { selectDepartments, selectLoadingDepartments, selectDepartmentsError } from 'src/app/store/rti/company/departments/departments.selectors';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  departments: Department[];
  loading: boolean;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
})
export class DepartmentsPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'button',
      cellRenderer: DepartmentActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  departments$ = this.store.select(selectDepartments);
  loading$ = this.store.select(selectLoadingDepartments);
  error$ = this.store.select(selectDepartmentsError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadDepartments());

    this.vm$ = combineLatest([this.departments$, this.loading$]).pipe(
      map(([departments, loading]) => ({ departments, loading }))
    );
  }

  ngOnInit() {
    this.departments$.subscribe((res) => console.log(res));
  }

  async editDepartment() {
    const modal = await this.modalController.create({
      component: EditDepartmentPage,
    });
    return await modal.present();
  }
}
