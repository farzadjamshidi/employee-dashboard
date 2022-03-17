import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class HoursToHoursColonMinutesHerlper
{

  constructor(
    private decimalPipe: DecimalPipe
  )
  {
  }

  transform(value: number): string
  {
    if (typeof value !== 'number')
      return value;

    let hours = Math.floor(value).toString();
    if (hours.length === 1)
      hours = '0' + hours;

    hours = this.decimalPipe.transform(hours, '2.') || '';

    let minutes = Math.floor((value - Math.floor(value)) * 60).toString();
    if (minutes.length === 1)
      minutes = '0' + minutes;

    return hours + ':' + minutes;
  }
}
