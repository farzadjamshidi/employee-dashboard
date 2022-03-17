import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Shift, ShiftsInformation } from '../models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftHelper
{

  constructor() { }

  getTotalAndEachEmployeeInformation({ shifts, employees }: { shifts: Shift[], employees: Employee[]; }): ShiftsInformation
  {
    const totalInformation: ShiftsInformation = {
      totalEmployees: 0, // TE
      totalTimeInHours: 0, // TTS
      totalRegularPaid: 0, // TRP
      totalOvertimePaid: 0, // TOP
      employees: {}
    };

    employees.forEach(employee =>
    {
      totalInformation.employees[employee.id.toString()] = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        hourlyRate!: employee.hourlyRate,
        overtimeHourlyRate!: employee.overtimeHourlyRate,
        totalTimeInHours: 0,
        totalRegularPaid: 0,
        totalOvertimePaid: 0
      };
    });

    shifts.forEach((shift) =>
    {
      const clockIn = new Date(shift.clockIn);
      const clockOut = new Date(shift.clockOut);

      const shiftInHours = (clockOut.getTime() - clockIn.getTime()) / (3600 * 1000);

      // calculate TTS
      totalInformation.totalTimeInHours += shiftInHours;

      // calculate ETTS
      totalInformation.employees[shift.employeeId.toString()].totalTimeInHours += shiftInHours;

      const { regularHours, overtimeHours } = this.getRegularHoursAndOvertimeHours(clockIn, clockOut);

      const regularPaidAmount = regularHours * totalInformation.employees[shift.employeeId.toString()].hourlyRate;
      // calculate TRP
      totalInformation.totalRegularPaid += regularPaidAmount;

      // calculate ETRP
      totalInformation.employees[shift.employeeId.toString()].totalRegularPaid += regularPaidAmount;

      const overtimePaidAmount = overtimeHours * totalInformation.employees[shift.employeeId.toString()].overtimeHourlyRate;
      // calculate TOP
      totalInformation.totalOvertimePaid += overtimePaidAmount;

      // calculate ETOP
      totalInformation.employees[shift.employeeId.toString()].totalOvertimePaid += overtimePaidAmount;
    });

    // calculate TE
    totalInformation.totalEmployees = employees.length;

    return totalInformation;
  }

  getRegularHoursAndOvertimeHours(clockIn: Date, clockOut: Date): { regularHours: number, overtimeHours: number; }
  {

    const shiftInHours = (clockOut.getTime() - clockIn.getTime()) / (3600 * 1000);

    let regularHours = 0;
    let overtimeHours = 0;

    if (shiftInHours <= 8)
    {
      overtimeHours = 0;
      regularHours = shiftInHours;
    }
    else
    {
      if (clockIn.getDay() === clockOut.getDay())
      {
        overtimeHours = shiftInHours - 8;
        regularHours = 8;
      }
      else
      {
        const clockInCopy = new Date(clockIn);
        const firstDayMidnight = new Date(clockInCopy.setHours(24, 0, 0, 0)).getTime();
        const firstDayHours = (firstDayMidnight - clockIn.getTime()) / (3600 * 1000);

        if (firstDayHours <= 8)
        {
          overtimeHours = 0;
          regularHours = firstDayHours;
        }
        else
        {
          overtimeHours = firstDayHours - 8;
          regularHours = 8;
        }

        const secondDayHours = (clockOut.getTime() - firstDayMidnight) / (3600 * 1000);

        if (secondDayHours <= 8)
        {
          regularHours += secondDayHours;
        }
        else
        {
          overtimeHours += secondDayHours - 8;
          regularHours += 8;
        }
      }
    }

    return { regularHours, overtimeHours };
  }
}
