import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BulkEditModule } from 'src/app/components/bulk-edit/bult-edit.module';
import { HoursToHoursColonMinutesPipeModule } from 'src/app/core/helpers/hours-to-hours-colon-minutes-pipe/hours-to-hours-colon-minutes.module';
import { LocalHostV0EmployeeRepo } from 'src/app/core/repository/localHost/v0/employee.repo';
import { LocalHostV0ShiftRepo } from 'src/app/core/repository/localHost/v0/shift.repo';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const COMPONENTS = [
  HomeComponent
];

const MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule
];

const ED_MODULES = [
  BulkEditModule,
  HoursToHoursColonMinutesPipeModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ...MATERIAL_MODULES,
    ...ED_MODULES
  ],
  providers: [
    { provide: 'IEmployeeRepo', useClass: LocalHostV0EmployeeRepo },
    { provide: 'IShiftRepo', useClass: LocalHostV0ShiftRepo }
  ]
})
export class HomeModule { }
