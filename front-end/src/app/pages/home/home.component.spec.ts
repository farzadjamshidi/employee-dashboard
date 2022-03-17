import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { HoursToHoursColonMinutesPipeModule } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.module';
import { GetEmployeesRequest, GetEmployeesResponse } from 'src/app/core/models/get-employees.model';
import { GetShiftsRequest, GetShiftsResponse } from 'src/app/core/models/get-shifts.model';
import { IEmployeeRepo } from 'src/app/core/repository/interfaces/employee.interface';
import { IShiftRepo } from 'src/app/core/repository/interfaces/shift.interface';
import { HomeComponent } from './home.component';


describe('HomeComponent', () =>
{
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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

class IMockEmployeeRepo implements IEmployeeRepo
{
  list(request: GetEmployeesRequest): Observable<GetEmployeesResponse>
  {
    return new Observable<GetEmployeesResponse>();
  }
}

class IMockShiftRepo implements IShiftRepo
{
  list(request: GetShiftsRequest): Observable<GetShiftsResponse>
  {
    return new Observable<GetShiftsResponse>();
  }
}
