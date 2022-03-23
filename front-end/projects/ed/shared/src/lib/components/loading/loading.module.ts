import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from "./loading.component";

const BASE_MODULES = [CommonModule];
const COMPONENTS = [LoadingComponent];
const MATERIAL_MODULES = [MatProgressSpinnerModule];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...BASE_MODULES,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...BASE_MODULES,
    ...MATERIAL_MODULES,
    ...COMPONENTS
  ]
})
export class LoadingModule { }
