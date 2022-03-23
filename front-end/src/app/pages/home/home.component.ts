import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { BulkEditComponent } from 'src/app/components/bulk-edit/bulk-edit.component';
import { ShiftHelper } from 'src/app/core/helpers/shift.helper';
import { BulkEditDataModel } from 'src/app/core/models/bulk-edit.model';
import { Employee, EmployeeInformation } from 'src/app/core/models/employee.model';
import { GetEmployeesRequest } from 'src/app/core/models/get-employees.model';
import { GetShiftsRequest } from 'src/app/core/models/get-shifts.model';
import { Shift, ShiftsInformation } from 'src/app/core/models/shift.model';
import { IEmployeeRepo } from 'src/app/core/repository/interfaces/employee.interface';
import { IShiftRepo } from 'src/app/core/repository/interfaces/shift.interface';

@Component({
  selector: 'ed-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit
{

  shiftsInformation: ShiftsInformation = new ShiftsInformation();
  shifts: Shift[] = [];
  employees: Employee[] = [];
  employeesInformation: EmployeeInformation[] = [];
  loading = false;

  constructor(
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    @Inject('IEmployeeRepo') private employeeRepo: IEmployeeRepo,
    @Inject('IShiftRepo') private shiftRepo: IShiftRepo,
    private shiftHelper: ShiftHelper
  )
  {
  }

  displayedColumns: string[] = [
    'select', 'Name', 'Email', 'TotalClockedIn', 'TotalRegularPaid', 'TotalOvertimePaid'
  ];
  dataSource = new MatTableDataSource<EmployeeInformation>();
  selection = new SelectionModel<EmployeeInformation>(true, []);

  isAllSelected()
  {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle()
  {
    if (this.isAllSelected())
    {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  async ngOnInit(): Promise<void>
  {

    try
    {
      this.loading = true;

      const shiftsRequest = new GetShiftsRequest();

      this.shifts = await firstValueFrom(this.shiftRepo.list(shiftsRequest));

      const employeesRequest = new GetEmployeesRequest();

      this.employees = await firstValueFrom(this.employeeRepo.list(employeesRequest));

      this.shiftsInformation = this.shiftHelper.getTotalAndEachEmployeeInformation(
        { shifts: this.shifts, employees: this.employees }
      );

      this.employeesInformation = Object.values(this.shiftsInformation.employees);

      this.dataSource = new MatTableDataSource<EmployeeInformation>(this.employeesInformation);

      this.loading = false;

    } catch (error)
    {
      this.loading = false;
    }

    this.changeDetector.detectChanges();
  }

  bulkEdit(): void
  {

    const bulkEditData: BulkEditDataModel = {
      selectedEmployees: this.selection.selected
    };

    const dialogRef = this.dialog.open(BulkEditComponent, {
      panelClass: 'bulk-edit-dialog',
      width: '80vw',
      maxHeight: '80vh',
      data: bulkEditData
    });
  }
}

