import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/app/app.reducer';
import { UserEffects } from './store/rti/hr/users/users.effects';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { NiRateEffects } from './store/rti/admin/niRates/niRates.effects';
import { FormatEffects } from './store/rti/admin/formats/formats.effects';
import { AdminCompanyEffects } from './store/rti/admin/company/admin-companies.effects';
import { DepartmentEffects } from './store/rti/company/departments/departments.effects';
import { RegionEffects } from './store/rti/company/regions/regions.effects';
import { RoleEffects } from './store/rti/company/roles/roles.effects';
import { SiteEffects } from './store/rti/company/sites/sites.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([
      UserEffects,
      AuthEffects,
      NiRateEffects,
      FormatEffects,
      AdminCompanyEffects,
      DepartmentEffects,
      RegionEffects,
      RoleEffects,
      SiteEffects,
    ]),
    AppRoutingModule,
    AuthModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
