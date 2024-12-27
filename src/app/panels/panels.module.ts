import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelsPage } from './panels.page';
import { PanelsRoutingModule } from './panels-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SideMenuPage } from './side-menu/side-menu.page';
import { IonicModule } from '@ionic/angular';
import { UiModule } from '../shared/ui/ui.module';
import { RouterModule } from '@angular/router';
import { HeaderPage } from './header/header.page';

@NgModule({
  declarations: [PanelsPage, SideMenuPage, HeaderPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PanelsRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
  ],
})
export class PanelsModule {}
