import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { CompanyRoutingModule } from './company-routing.module';
import { RouterModule } from '@angular/router';
import { SitePage } from './site/site.page';
import { RegionPage } from './region/region.page';
import { DepartmentPage } from './department/department.page';
import { RolePage } from './role/role.page';
import { CompanyPage } from './company.page';

@NgModule({
  declarations: [CompanyPage, SitePage, RolePage, DepartmentPage, RegionPage],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CompanyRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
  ],
})
export class CompanyModule {}
