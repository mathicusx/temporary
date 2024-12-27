import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumanResourcesPage } from './human-resources.page';
import { UserListPage } from './user-list/user-list.page';
import { EditUserPage } from './user-list/user/edit-user.page';

const routes: Routes = [
  {
    path: '',
    component: HumanResourcesPage,
    children: [
      {
        path: 'user/:id',
        component: EditUserPage,
      },
      {
        path: 'users',
        component: UserListPage,
      },
    ],
  },

  // { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanResourcesRoutingModule {}
