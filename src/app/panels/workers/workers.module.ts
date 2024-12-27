import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { MobileViewPage } from './mobile-view/mobile-view.page';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersPage } from './workers.page';
import { RouterModule } from '@angular/router';
import { WorkerDashboardPage } from './dashboard/worker-dashboard.page';
import { JobInfoPage } from './job-info/job-info.page';
import { DocumentsPage } from './documents/documents.page';

@NgModule({
  declarations: [
    WorkersPage,
    MobileViewPage,
    WorkerDashboardPage,
    JobInfoPage,
    DocumentsPage,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    WorkersRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
  ],
})
export class WorkersModule {}
