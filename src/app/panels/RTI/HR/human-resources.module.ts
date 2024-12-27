import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { RouterModule } from '@angular/router';
import { HumanResourcesPage } from './human-resources.page';
import { EditUserPage } from './user-list/user/edit-user.page';
import { UserListPage } from './user-list/user-list.page';

@NgModule({
  declarations: [EditUserPage, UserListPage, HumanResourcesPage],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HumanResourcesRoutingModule,
    NgxChartsModule,
    IonicModule,
    UiModule,
  ],
})
export class HumanResourcesModule {}
