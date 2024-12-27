import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimeDirective } from './datetime.directive';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DatetimePopoverComponent } from './datetime-popover/datetime-popover.component';

@NgModule({
  declarations: [DatetimeDirective, DatetimePopoverComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [DatetimeDirective, DatetimePopoverComponent],
})
export class DatetimeModule {}
