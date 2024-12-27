import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './admin/dashboard/dashboard.page';
import { RTIPage } from './rti.page';

const routes: Routes = [
  {
    path: '',
    component: RTIPage,
  },
  {
    path: 'HR',
    loadChildren: () =>
      import(`./HR/human-resources.module`).then((h) => h.HumanResourcesModule),
    // canActivate: [AuthGuard, AccessGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import(`./admin/admin.module`).then((a) => a.AdminModule),
    // canActivate: [AuthGuard, AccessGuard],
  },
  {
    path: 'company',
    loadChildren: () =>
      import(`./company/company.module`).then((c) => c.CompanyModule),
    // canActivate: [AuthGuard, AccessGuard],
  },

  // { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RTIRoutingModule {}
