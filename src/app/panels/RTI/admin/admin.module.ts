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
import { NiRatesPage } from './ni-rates/ni-rates.page';
import { NiRateActionCellRendererComponent } from './ni-rates/niRateActionCellRenderComponent';
import { EditNiRatePage } from './ni-rates/ni-rate/ni-rate.page';
import { AgGridModule } from 'ag-grid-angular';
import { EditFormatPage } from './formats/format/format.page';
import { FormatActionCellRendererComponent } from './formats/formatActionCellRenderComponent';
import { AdminCompaniesPage } from './companys/admin-companies.page';
import { EditAdminCompanyPage } from './companys/admin-company/admin-company.page';
import { AdminCompanyActionCellRendererComponent } from './companys/adminCompaniesActionCellRenderComponent';

@NgModule({
  declarations: [
    AdminPage,
    DashboardPage,
    FormatsPage,
    EditFormatPage,
    FormatActionCellRendererComponent,
    AdminCompaniesPage,
    EditAdminCompanyPage,
    AdminCompanyActionCellRendererComponent,
    NiRatesPage,
    NiRateActionCellRendererComponent,
    EditNiRatePage,
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
    AgGridModule,
  ],
})
export class AdminModule {}
