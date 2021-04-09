import { Component, OnInit } from '@angular/core';
import { DatagridOptions } from 'dist/lib/lib/components/datagrid/datagrid.interface';
import { DatagridColumn } from 'projects/lib/src/lib/components/datagrid/datagrid.interface';
import { Name } from '../../data-model/Name';

@Component({
  selector: 'app-my-names',
  templateUrl: './my-names.component.html',
  styleUrls: ['./my-names.component.scss']
})
export class MyNamesComponent implements OnInit {

  names: Name[] = [
    { id: '1', rootName: 'Jim', createdOn: new Date('2021-03-10T02:00:00.000Z') },
    { id: '2', rootName: 'Amy', createdOn: new Date('2020-05-10T07:25:00.000Z') },
    { id: '3', rootName: 'Bob', createdOn: new Date('2020-11-28T14:21:00.000Z') },
  ];

  columns: DatagridColumn[] = [
    { Id: 'rootName', Name: 'Name', Type: 'string', Filter: true },
    { Id: 'createdOn', Name: 'Created On', Type: 'date', Filter: true }
  ];

  options: DatagridOptions = {
    // click: (row: Name) => {
    //   console.log(row);
    // }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
