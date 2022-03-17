import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoursToHoursColonMinutesPipe } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.pipe';
import { HoursToHoursColonMinutesHerlper } from './hours-to-hours-colon-minutes.helper';

@NgModule({
  declarations: [
    HoursToHoursColonMinutesPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DecimalPipe,
    HoursToHoursColonMinutesHerlper
  ],
  exports: [
    HoursToHoursColonMinutesPipe
  ]
})
export class HoursToHoursColonMinutesPipeModule { }
