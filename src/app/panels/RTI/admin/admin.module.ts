import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AdminPage } from './admin.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { FormatsPage } from './formats/formats.page';
import { AdminCompanyPage } from './company/admin-company.page';
import { NiRatesPage } from './ni-rates/ni-rates.page';

@NgModule({
  declarations: [
    AdminPage,
    DashboardPage,
    FormatsPage,
    AdminCompanyPage,
    NiRatesPage,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
  ],
})
export class AdminModule {}
