import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { CompanyRoutingModule } from './company-routing.module';
import { RouterModule } from '@angular/router';

import { CompanyPage } from './company.page';
import { SitesPage } from './sites/sites.page';
import { SiteActionCellRendererComponent } from './sites/siteActionCellRenderComponent';
import { DepartmentsPage } from './departments/departments.page';
import { EditDepartmentPage } from './departments/department/department.page';
import { DepartmentActionCellRendererComponent } from './departments/departmentActionCellRenderComponent';
import { RegionsPage } from './regions/regions.page';
import { EditRegionPage } from './regions/region/region.page';
import { RegionActionCellRendererComponent } from './regions/regionActionCellRenderComponent';
import { RolesPage } from './roles/roles.page';
import { EditRolePage } from './roles/role/role.page';
import { RoleActionCellRendererComponent } from './roles/roleActionCellRenderComponent';
import { AgGridModule } from 'ag-grid-angular';
import { EditSitePage } from './sites/site/site.page';
import { ImportsPage } from './imports/imports.page';
import { EditImportPage } from './imports/import/import.page';
import { ImportsActionCellRendererComponent } from './imports/importsActionCellRenderComponent';

@NgModule({
  declarations: [
    CompanyPage,
    SitesPage,
    EditSitePage,
    SiteActionCellRendererComponent,
    DepartmentsPage,
    EditDepartmentPage,
    DepartmentActionCellRendererComponent,
    RegionsPage,
    EditRegionPage,
    RegionActionCellRendererComponent,
    RolesPage,
    EditRolePage,
    RoleActionCellRendererComponent,
    ImportsPage,
    EditImportPage,
    ImportsActionCellRendererComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CompanyRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
    AgGridModule,
  ],
})
export class CompanyModule {}
