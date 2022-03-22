import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
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
  today: Date = new Date();

  constructor(
    private snackBar: MatSnackBar,
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
    this.data.selectedEmployees?.forEach(employee =>
    {
      this.shiftTimeChange(this.today, employee);
    });
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

  changeClockInTime(clockInHHColonMM: string, shift: ShiftByHour): void
  {
    const [clockInHour, clockInMinute] = this.getHourAndMinute(clockInHHColonMM);

    if ((!clockInHour && clockInHour !== 0) || (!clockInMinute && clockInMinute !== 0))
      return;

    const newClockIn = this.setHourAndMinute(shift.clockIn, clockInHour, clockInMinute);

    const totalTimeHHColonMM = this.getTotalTimeHHColonMM(newClockIn, shift.clockOut);

    this.shiftsByDate[shift.employeeId].find(
      shiftByDate => shiftByDate.id === shift.id
    )!.totalTimeHHColonMM = totalTimeHHColonMM;

    this.changeDetector.detectChanges();
  }

  changeClockOutTime(clockOutHHColonMM: string, shift: ShiftByHour): void
  {
    const [clockOutHour, clockOutMinute] = this.getHourAndMinute(clockOutHHColonMM);

    if ((!clockOutHour && clockOutHour !== 0) || (!clockOutMinute && clockOutMinute !== 0))
      return;

    const newClockOut = this.setHourAndMinute(shift.clockOut, clockOutHour, clockOutMinute);

    const totalTimeHHColonMM = this.getTotalTimeHHColonMM(shift.clockIn, newClockOut);

    this.shiftsByDate[shift.employeeId].find(
      shiftByDate => shiftByDate.id === shift.id
    )!.totalTimeHHColonMM = totalTimeHHColonMM;

    this.changeDetector.detectChanges();
  }

  cancel(): void
  {
    this.dialogRef.close();
  };

  async save(): Promise<void>
  {
    const updatedShifts: Shift[] = [];

    Object.values(this.shiftsByDate).forEach(shifts =>
    {
      shifts.forEach(shift =>
      {

        const [clockInHour, clockInMinute] = this.getHourAndMinute(shift.clockInHHColonMM);

        const [clockOutHour, clockOutMinute] = this.getHourAndMinute(shift.clockOutHHColonMM);

        updatedShifts.push({
          id: shift.id,
          employeeId: shift.employeeId,
          clockIn: this.setHourAndMinute(shift.clockIn, clockInHour, clockInMinute),
          clockOut: this.setHourAndMinute(shift.clockOut, clockOutHour, clockOutMinute)
        });
      });

    });

    try
    {
      if (updatedShifts.length)
      {
        const shiftsRequest: PutShiftsRequest = {
          shifts: updatedShifts
        };

        await firstValueFrom(this.shiftRepo.update(shiftsRequest));
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

      await firstValueFrom(this.employeeRepo.update(employeesRequest));

      this.snackBar.open('Saved successfully.', undefined, {
        duration: 2000
      });

    } catch (error)
    {
      this.snackBar.open('Save faild.', undefined, {
        duration: 2000
      });
    }
  };

  getHourAndMinute(HHColonMM: string): [number, number]
  {
    const hour = Number(HHColonMM.split(':')[0]);
    const minute = Number(HHColonMM.split(':')[1]);

    return [hour, minute];
  }

  setHourAndMinute(date: string, newHour: number, newMinute: number): string
  {
    return new Date(new Date(date + '+0000').setUTCHours(newHour, newMinute)).toISOString().replace('Z', '');
  }

  getTotalTimeHHColonMM(clockIn: string, clockOut: string): string
  {
    const totalTime = (new Date(clockOut).getTime() - new Date(clockIn).getTime()) / (1000 * 60 * 60);
    return this.hoursToHoursColonMinutesHerlper.transform(totalTime);
  }
}
