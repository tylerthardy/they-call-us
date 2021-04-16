import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridComponent } from './datagrid.component';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { DateFilterModule } from '../../clr-filters/date-filter/date-filter.module';

@NgModule({
  declarations: [
    DatagridComponent
  ],
  imports: [
    CommonModule,
    DateFilterModule,
    ClrIconModule,
    ClrDatagridModule
  ],
  exports: [
    DatagridComponent
  ]
})
export class DatagridModule { }
