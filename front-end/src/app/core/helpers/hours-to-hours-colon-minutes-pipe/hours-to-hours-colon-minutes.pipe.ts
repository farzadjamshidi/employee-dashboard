import { Pipe, PipeTransform } from '@angular/core';
import { HoursToHoursColonMinutesHerlper } from './hours-to-hours-colon-minutes.helper';
@Pipe({
  name: 'HtoHcolonM',

})
export class HoursToHoursColonMinutesPipe implements PipeTransform
{

  constructor(
    private hoursToHoursColonMinutesHerlper: HoursToHoursColonMinutesHerlper
  )
  {
  }

  transform(value: number): string
  {
    return this.hoursToHoursColonMinutesHerlper.transform(value);
  }
}
