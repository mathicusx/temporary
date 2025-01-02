import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { combineLatest, map, Observable } from 'rxjs';
import { User } from 'src/app/models/rti/users.model';
import { loadUsers } from 'src/app/store/rti/hr/users/users.actions';
import {
  selectError,
  selectLoading,
  selectUsers,
} from 'src/app/store/rti/hr/users/users.selectors';
import { EditUserPage } from './user/edit-user.page';
import { ActionCellRendererComponent } from './actionCellRenderComponent';

ModuleRegistry.registerModules([AllCommunityModule]);

interface ViewModel {
  users: User[];
  loading: boolean;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  public readonly vm$: Observable<ViewModel>;

  columnDefs: ColDef[] = [
    { field: 'id', flex: 1, maxWidth: 70 },
    { field: 'email', sortable: true, filter: true, flex: 1, minWidth: 50 },
    { field: 'name', sortable: true, filter: true, flex: 1, minWidth: 50 },
    {
      field: 'createdDatetime',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'roles',
      sortable: true,
      filter: true,
      valueFormatter: this.formatRoles,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'company',
      sortable: true,
      filter: true,
      valueFormatter: this.formatCompany,
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'button',
      cellRenderer: ActionCellRendererComponent,
      flex: 1,
      minWidth: 80,
    },
  ];

  users$ = this.store.select(selectUsers); // Accessing feature state through selectors
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {
    this.store.dispatch(loadUsers());

    this.vm$ = combineLatest([this.users$, this.loading$]).pipe(
      map(([users, loading]) => ({ users, loading }))
    );
  }

  ngOnInit() {
    this.users$.subscribe((res) => console.log(res));
  }

  async editUser() {
    const modal = await this.modalController.create({
      component: EditUserPage,
    });
    return await modal.present();
  }

  formatRoles(params): string {
    // If roles is an array
    if (Array.isArray(params.value)) {
      return params.value.join(', ');
    }

    // If roles is an object
    if (typeof params.value === 'object') {
      return Object.values(params.value).join(', ');
    }

    return ''; // Return empty string if roles are undefined
  }

  formatCompany(params): string {
    return params.value ? params.value.name : 'No Company'; // Assuming company has a name property
  }
}
