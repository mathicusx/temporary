import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersPage } from './workers.page';
import { WorkerDashboardPage } from './dashboard/worker-dashboard.page';
import { JobInfoPage } from './job-info/job-info.page';
import { DocumentsPage } from './documents/documents.page';

const routes: Routes = [
  {
    path: '',
    component: WorkersPage,
    children: [
      {
        path: 'dashboard',
        component: WorkerDashboardPage,
      },
      {
        path: 'job-info',
        component: JobInfoPage,
      },
      {
        path: 'documents',
        component: DocumentsPage,
      },
      // {
      //   path: 'sites',
      //   component: DashboardPage,
      // },
      // {
      //   path: 'test2',
      //   component: DashboardPage,
      // },
      // {
      //   path: 'workers/mobile-view',
      //   component: MobileViewPage,
      //   title: 'Mobile-view',
      // },
    ],
  },

  // { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkersRoutingModule {}
