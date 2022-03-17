import { TestBed } from '@angular/core/testing';
import { Employee } from '../models/employee.model';
import { Shift } from '../models/shift.model';
import { ShiftHelper } from './shift.helper';


describe('ShiftHelper', () =>
{
  let service: ShiftHelper;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftHelper);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });

  it('should return Total And Each Employee Information correct', () =>
  {
    const employees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'jd@jd.com',
        hourlyRate: 10,
        overtimeHourlyRate: 15
      }
    ];

    const shifts: Shift[] = [
      { id: 1, employeeId: 1, clockIn: '2022-02-04T21:30:00', clockOut: '2022-02-05T09:00:00' },
      { id: 2, employeeId: 1, clockIn: '2022-01-25T16:00:00', clockOut: '2022-01-26T01:30:00' },
      { id: 3, employeeId: 1, clockIn: '2022-02-12T10:00:00', clockOut: '2022-02-12T20:00:00' },
      { id: 4, employeeId: 1, clockIn: '2022-02-11T12:00:00', clockOut: '2022-02-11T18:00:00' }
    ];

    const totalAndEachEmployeeInformation = service.getTotalAndEachEmployeeInformation({ shifts, employees });

    expect(totalAndEachEmployeeInformation).toEqual({
      totalEmployees: 1,
      totalTimeInHours: 37,
      totalRegularPaid: 340,
      totalOvertimePaid: 45,
      employees: {
        '1': {
          id: 1,
          name: 'John Doe',
          email: 'jd@jd.com',
          hourlyRate: 10,
          overtimeHourlyRate: 15,
          totalTimeInHours: 37,
          totalRegularPaid: 340,
          totalOvertimePaid: 45
        }
      }
    });
  });
});
