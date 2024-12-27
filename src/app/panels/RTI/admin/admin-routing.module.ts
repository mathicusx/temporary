import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { FormatsPage } from './formats/formats.page';
import { NiRatesPage } from './ni-rates/ni-rates.page';
import { AdminCompanyPage } from './company/admin-company.page';


const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'formats',
        component: FormatsPage,
      },
      {
        path: 'company',
        component: AdminCompanyPage,
      },
      {
        path: 'ni-rates',
        component: NiRatesPage,
      },
    ],
  },

  // { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
