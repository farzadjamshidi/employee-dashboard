import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HoursToHoursColonMinutesHerlper } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.helper';
import { LocalHostV0EmployeeRepo } from 'src/app/core/repository/localHost/v0/employee.repo';
import { LocalHostV0ShiftRepo } from 'src/app/core/repository/localHost/v0/shift.repo';
import { BulkEditComponent } from './bulk-edit.component';

const COMPONENTS = [
  BulkEditComponent
];

const CORE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

const MATERIAL_MODULES = [
  MatDividerModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...CORE_MODULES,
    ...MATERIAL_MODULES
  ],
  providers: [
    HoursToHoursColonMinutesHerlper,
    { provide: 'IShiftRepo', useClass: LocalHostV0ShiftRepo },
    { provide: 'IEmployeeRepo', useClass: LocalHostV0EmployeeRepo }
  ]
})
export class BulkEditModule { }
