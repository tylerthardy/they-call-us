import { Component, OnInit } from '@angular/core';
import { ClrDatagridPagination } from '@clr/angular';
import { User } from '../../data-model/User';

@Component({
  selector: 'app-my-names',
  templateUrl: './my-names.component.html',
  styleUrls: ['./my-names.component.scss']
})
export class MyNamesComponent implements OnInit {

  users: User[] = [
    { id: '1', name: 'Jim', color: 'blue', creation: new Date('2021-03-10T02:00:00.000Z') },
    { id: '2', name: 'Amy', color: 'red', creation: new Date('2020-05-10T07:25:00.000Z') },
    { id: '3', name: 'Bob', color: 'green', creation: new Date('2020-11-28T14:21:00.000Z') },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
