import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HoursToHoursColonMinutesHerlper } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.helper';
import { IMockEmployeeRepo, IMockShiftRepo } from 'src/app/pages/home/home.component.spec';
import { BulkEditComponent } from './bulk-edit.component';



const MATERIAL_MODULES = [
  MatDividerModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule
];


describe('BulkEditComponent', () =>
{
  let component: BulkEditComponent;
  let fixture: ComponentFixture<BulkEditComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [BulkEditComponent],
      imports: [
        ...MATERIAL_MODULES
      ],
      providers: [
        MatSnackBar,
        DecimalPipe,
        HoursToHoursColonMinutesHerlper,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: 'IShiftRepo', useClass: IMockShiftRepo },
        { provide: 'IEmployeeRepo', useClass: IMockEmployeeRepo }
      ]
    })
      .compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(BulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should getHourAndMinute method return proper value', () =>
  {
    const HHColonMM1 = '12:00';
    const HHColonMM2 = '2:0';
    const HHColonMM3 = '2:';
    const HHColonMM4 = '';
    const HHColonMM5 = ':';
    const HHColonMM6 = ':6';
    expect(component.getHourAndMinute(HHColonMM1)).toEqual([12, 0]);
    expect(component.getHourAndMinute(HHColonMM2)).toEqual([2, 0]);
    expect(component.getHourAndMinute(HHColonMM3)).toEqual([2, 0]);
    expect(component.getHourAndMinute(HHColonMM4)).toEqual([0, NaN]);
    expect(component.getHourAndMinute(HHColonMM5)).toEqual([0, 0]);
    expect(component.getHourAndMinute(HHColonMM6)).toEqual([0, 6]);
  });

  it('should setHourAndMinute method return proper value', () =>
  {
    const date1 = '2022-01-01T23:00:00';
    const newHour1 = 21;
    const newMinute1 = 30;

    const date2 = '2022-01-01T02:00:00';
    const newHour2 = 5;
    const newMinute2 = 30;

    const date3 = '2022-01-01T15:00:00';
    const newHour3 = 17;
    const newMinute3 = 30;

    expect(component.setHourAndMinute(date1, newHour1, newMinute1)).toEqual('2022-01-01T21:30:00.000');
    expect(component.setHourAndMinute(date2, newHour2, newMinute2)).toEqual('2022-01-01T05:30:00.000');
    expect(component.setHourAndMinute(date3, newHour3, newMinute3)).toEqual('2022-01-01T17:30:00.000');
  });
});
