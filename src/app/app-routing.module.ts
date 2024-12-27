import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth/auth.page';
import { LoginPage } from './auth/login/login.page';
import { LandingPage } from './landing-page/landing-page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'authentication/login',
    component: AuthPage,
    // children: [
    //   {
    //     path: 'login',
    //     component: LoginPage,
    //     // canActivate: [SingleSignOnGuard, IsSignedInGuard],
    //   },
    // ],
  },
  {
    path: 'panels',
    loadChildren: () =>
      import(`../app/panels/panels.module`).then((a) => a.PanelsModule),
    // canActivate: [AuthGuard, AccessGuard],
  },
  {
    path: 'landing',
    component: LandingPage,
  },

  { path: '**', redirectTo: 'landing' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
