import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app/app.state';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ModuleRegistry, AllCommunityModule, ColDef } from 'ag-grid-community';
import { Observable, combineLatest, map } from 'rxjs';
import { Role } from 'src/app/models/company/role.model';
import { RoleActionCellRendererComponent } from './roleActionCellRenderComponent';
import { EditRolePage } from './role/role.page';
import { loadRoles } from 'src/app/store/rti/company/roles/roles.actions';
import {
  selectRoles,
  selectLoadingRoles,
  selectRolesError,
} from 'src/app/store/rti/company/roles/roles.selectors';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  roles: Role[];
  loading: boolean;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'button',
      cellRenderer: RoleActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  roles$ = this.store.select(selectRoles); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoadingRoles);
  error$ = this.store.select(selectRolesError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadRoles());

    this.vm$ = combineLatest([this.roles$, this.loading$]).pipe(
      map(([roles, loading]) => ({ roles, loading }))
    );
  }

  ngOnInit() {
    this.roles$.subscribe((res) => console.log(res));
  }

  async editRole() {
    const modal = await this.modalController.create({
      component: EditRolePage,
    });
    return await modal.present();
  }
}
