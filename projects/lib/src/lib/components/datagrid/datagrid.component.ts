import { Component, Input, OnInit } from '@angular/core';
import { DatagridColumn, DatagridOptions } from './datagrid.interface';

@Component({
  selector: 'lib-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent implements OnInit {

  @Input() columns: DatagridColumn[];
  @Input() options: DatagridOptions;
  @Input() data: any[];

  constructor() { }

  ngOnInit(): void {
  }

  click(row: any): void {
    if (!this.options.click) {
      return;
    }
    this.options.click(row);
  }

}
