import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { RTIRoutingModule } from './rti-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardPage } from './admin/dashboard/dashboard.page';
import { RTIPage } from './rti.page';

@NgModule({
  declarations: [RTIPage],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RTIRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
  ],
})
export class RTIModule {}
