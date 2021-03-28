import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from './date-filter.component';
import { FormsModule } from '@angular/forms';
import { ClrDatepickerModule } from '@clr/angular';

@NgModule({
  declarations: [
    DateFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClrDatepickerModule
  ],
  exports: [
    DateFilterComponent
  ]
})

export class DateFilterModule { }
