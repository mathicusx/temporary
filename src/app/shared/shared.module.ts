import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [NgxChartsModule, IonicModule, FormsModule, CommonModule],
  exports: [],
})
export class SharedModule {}
