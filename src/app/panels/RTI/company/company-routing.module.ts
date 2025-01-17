import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPage } from './company.page';
import { RegionsPage } from './regions/regions.page';
import { SitesPage } from './sites/sites.page';
import { DepartmentsPage } from './departments/departments.page';
import { RolesPage } from './roles/roles.page';
import { ImportsPage } from './imports/imports.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyPage,
    children: [
      {
        path: 'region',
        component: RegionsPage,
      },
      {
        path: 'imports',
        component: ImportsPage,
      },
      {
        path: 'site',
        component: SitesPage,
      },
      {
        path: 'department',
        component: DepartmentsPage,
      },
      {
        path: 'role',
        component: RolesPage,
      },
    ],
  },

  // { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
