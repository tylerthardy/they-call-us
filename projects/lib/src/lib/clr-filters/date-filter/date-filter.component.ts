import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements ClrDatagridFilterInterface<Date>, OnInit {

  constructor(filterContainer: ClrDatagridFilter) {
    filterContainer.setFilter(this);
  }

  @Input() property: string;

  changes = new Subject<Date>();
  state?: Date;

  form: NgModel;

  value: { from: Date, to: Date } = { from: undefined, to: undefined };

  isActive(): boolean {
    return !!this.value.from || !!this.value.to;
  }

  accepts(item: Date): boolean {
    const date = new Date(item[this.property]);
    return (!this.value.from || date >= this.value.from) &&
           (!this.value.to || date <= this.value.to);
  }

  modelChanged(event: Date): void {
    this.changes.next();
  }

  ngOnInit(): void {
  }

}
