import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
});
