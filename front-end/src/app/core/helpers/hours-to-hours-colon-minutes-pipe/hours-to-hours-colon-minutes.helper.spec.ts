import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { HoursToHoursColonMinutesHerlper } from './hours-to-hours-colon-minutes.helper';


describe('HoursToHoursColonMinutesHerlper', () =>
{
  let service: HoursToHoursColonMinutesHerlper;

  beforeEach(() =>
  {
    TestBed.configureTestingModule(
      {
        providers: [HoursToHoursColonMinutesHerlper, DecimalPipe]
      }
    );
    service = TestBed.inject(HoursToHoursColonMinutesHerlper);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });

  it('should return correct format hh:mm', () =>
  {
    expect(service.transform(1.5)).toBe('01:30');
    expect(service.transform(1.1)).toBe('01:06');
    expect(service.transform(2000.5)).toBe('2,000:30');
    expect(service.transform(100.5)).toBe('100:30');
    expect(service.transform(1.567)).toBe('01:34');
    expect(service.transform(1.6148)).toBe('01:36');
  });
});
