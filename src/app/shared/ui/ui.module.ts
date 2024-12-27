import { NgModule } from '@angular/core';

import { DatetimeModule } from './datetime/datetime.module';

@NgModule({
  imports: [DatetimeModule],
  exports: [DatetimeModule],
})
export class UiModule {}
