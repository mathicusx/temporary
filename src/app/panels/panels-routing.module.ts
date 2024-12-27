import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelsPage } from './panels.page';
import { MobileViewPage } from './workers/mobile-view/mobile-view.page';
import { WorkersPage } from './workers/workers.page';

const routes: Routes = [
  {
    path: '',
    component: PanelsPage,
    children: [
      {
        path: 'workers',
        loadChildren: () =>
          import(`./workers/workers.module`).then((w) => w.WorkersModule),
        // canActivate: [AuthGuard, AccessGuard],
      },
      {
        path: 'rti',
        loadChildren: () => import(`./RTI/rti.module`).then((r) => r.RTIModule),
        // canActivate: [AuthGuard, AccessGuard],
      },
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
export class PanelsRoutingModule {}
