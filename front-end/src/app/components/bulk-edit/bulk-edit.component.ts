import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HoursToHoursColonMinutesHerlper } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.helper';
import { BulkEditDataModel } from 'src/app/core/models/bulk-edit.model';
import { EmployeeInformation } from 'src/app/core/models/employee.model';
import { GetShiftsRequest } from 'src/app/core/models/get-shifts.model';
import { PutEmployeesRequest } from 'src/app/core/models/put-employees.model';
import { PutShiftsRequest } from 'src/app/core/models/put-shifts.model';
import { Shift } from 'src/app/core/models/shift.model';
import { IEmployeeRepo } from 'src/app/core/repository/interfaces/employee.interface';
import { IShiftRepo } from 'src/app/core/repository/interfaces/shift.interface';

class ShiftByHour extends Shift
{
  clockInHHColonMM!: string;
  clockOutHHColonMM!: string;
  totalTimeHHColonMM!: string;
}

@Component({
  selector: 'app-bulk-edit',
  templateUrl: './bulk-edit.component.html',
  styleUrls: ['./bulk-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkEditComponent implements OnInit
{

  shiftsByDate: { [key: string]: ShiftByHour[]; } = {};

  constructor(
    private hoursToHoursColonMinutesHerlper: HoursToHoursColonMinutesHerlper,
    private changeDetector: ChangeDetectorRef,
    @Inject('IShiftRepo') private shiftRepo: IShiftRepo,
    @Inject('IEmployeeRepo') private employeeRepo: IEmployeeRepo,
    private dialogRef: MatDialogRef<BulkEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulkEditDataModel
  )
  { }

  ngOnInit(): void
  {
  }

  shiftTimeChange(date: Date, employee: EmployeeInformation): void
  {
    const shiftsRequest: GetShiftsRequest = {
      employeeId: employee.id,
      startDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    };

    this.shiftRepo.list(shiftsRequest).subscribe({
      next: (shifts) =>
      {
        console.log(shifts);
        this.shiftsByDate[employee.id] = [];
        this.shiftsByDate[employee.id] = shifts.map(shift =>
        {
          const totalTime = (new Date(shift.clockOut).getTime() - new Date(shift.clockIn).getTime()) / (1000 * 60 * 60);
          const totalTimeHHColonMM = this.hoursToHoursColonMinutesHerlper.transform(totalTime);

          return {
            ...shift,
            clockInHHColonMM: new Date(shift.clockIn).getHours() + ':' + new Date(shift.clockIn).getMinutes(),
            clockOutHHColonMM: new Date(shift.clockOut).getHours() + ':' + new Date(shift.clockOut).getMinutes(),
            totalTimeHHColonMM: totalTimeHHColonMM
          };
        });
        this.changeDetector.detectChanges();
      },
      error: () =>
      {
      }
    });
  }

  cancel(): void
  {
    this.dialogRef.close();
  };

  save(): void
  {
    const updatedShifts: Shift[] = [];

    Object.values(this.shiftsByDate).forEach(shifts =>
    {
      shifts.forEach(shift =>
      {

        const clockInHour = Number(shift.clockInHHColonMM.split(':')[0]);
        const clockInMinute = Number(shift.clockInHHColonMM.split(':')[1]);

        const clockOutHour = Number(shift.clockOutHHColonMM.split(':')[0]);
        const clockOutMinute = Number(shift.clockOutHHColonMM.split(':')[1]);

        updatedShifts.push({
          id: shift.id,
          employeeId: shift.employeeId,
          clockIn: new Date(new Date(shift.clockIn).setUTCHours(clockInHour, clockInMinute)).toISOString().replace('Z', ''),
          clockOut: new Date(new Date(shift.clockOut).setUTCHours(clockOutHour, clockOutMinute)).toISOString().replace('Z', '')
        });
      });

    });

    if (updatedShifts.length)
    {
      const shiftsRequest: PutShiftsRequest = {
        shifts: updatedShifts
      };
      this.shiftRepo.update(shiftsRequest).subscribe({
        next: () =>
        {
        },
        error: () =>
        {
        }
      });
    }

    const employeesRequest: PutEmployeesRequest = {
      employees: this.data.selectedEmployees.map(employee =>
      {
        return {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          hourlyRate: employee.hourlyRate,
          overtimeHourlyRate: employee.overtimeHourlyRate
        };
      })
    };
    this.employeeRepo.update(employeesRequest).subscribe({
      next: () =>
      {
      },
      error: () =>
      {
      }
    });

  };
}
