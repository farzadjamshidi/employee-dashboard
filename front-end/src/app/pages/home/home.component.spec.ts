import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { HoursToHoursColonMinutesPipeModule } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.module';
import { GetEmployeesRequest, GetEmployeesResponse } from 'src/app/core/models/get-employees.model';
import { GetShiftsRequest, GetShiftsResponse } from 'src/app/core/models/get-shifts.model';
import { PutEmployeesRequest, PutEmployeesResponse } from 'src/app/core/models/put-employees.model';
import { PutShiftsRequest, PutShiftsResponse } from 'src/app/core/models/put-shifts.model';
import { IEmployeeRepo } from 'src/app/core/repository/interfaces/employee.interface';
import { IShiftRepo } from 'src/app/core/repository/interfaces/shift.interface';
import { HomeComponent } from './home.component';

export class MatDialogMock
{
  open()
  {
    return {
      afterClosed: () => of(true)
    };
  }
}

describe('HomeComponent', () =>
{
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const matDialog = new MatDialogMock();

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HoursToHoursColonMinutesPipeModule,
        MatTableModule,
        MatCheckboxModule,
      ],
      providers: [
        { provide: MatDialog, useValue: matDialog },
        { provide: 'IEmployeeRepo', useClass: IMockEmployeeRepo },
        { provide: 'IShiftRepo', useClass: IMockShiftRepo }
      ]
    })
      .compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});

export class IMockEmployeeRepo implements IEmployeeRepo
{
  list(request: GetEmployeesRequest): Observable<GetEmployeesResponse>
  {
    return new Observable<GetEmployeesResponse>();
  }
  update(request: PutEmployeesRequest): Observable<PutEmployeesResponse>
  {
    return new Observable<PutEmployeesResponse>();
  }
}

export class IMockShiftRepo implements IShiftRepo
{
  list(request: GetShiftsRequest): Observable<GetShiftsResponse>
  {
    return new Observable<GetShiftsResponse>();
  }
  update(request: PutShiftsRequest): Observable<PutShiftsResponse>
  {
    return new Observable<PutShiftsResponse>();
  }
}
