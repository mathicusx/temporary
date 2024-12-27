import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPage } from './company.page';
import { RegionPage } from './region/region.page';
import { SitePage } from './site/site.page';
import { DepartmentPage } from './department/department.page';
import { RolePage } from './role/role.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyPage,
    children: [
      {
        path: 'region',
        component: RegionPage,
      },
      {
        path: 'site',
        component: SitePage,
      },
      {
        path: 'department',
        component: DepartmentPage,
      },
      {
        path: 'role',
        component: RolePage,
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
