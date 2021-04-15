import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatagridOptions } from 'dist/lib/lib/components/datagrid/datagrid.interface';
import { DatagridColumn } from 'projects/lib/src/lib/components/datagrid/datagrid.interface';
import { Base58Encoder } from 'projects/lib/src/lib/util/base58.service';
import { map } from 'rxjs/operators';
import { Name } from '../../data-model/Name';
import { INamesService } from './names.service';

@Component({
  templateUrl: './my-names.component.html',
  styleUrls: ['./my-names.component.scss']
})
export class MyNamesComponent implements OnInit {

  names: Name[];

  columns: DatagridColumn[] = [
    { Id: 'rootName', Name: 'Name', Type: 'string', Filter: true },
    { Id: 'createdOn', Name: 'Created On', Type: 'date', Filter: true },
    { Id: 'nicknames', Name: 'Nicknames', Type: 'number', Computed: (row: Name) => row.nodes.length.toString() },
    { Id: 'delete', Name: 'Delete', Type: 'button', Click: (row: Name) => this.delete(row) }
  ];

  options: DatagridOptions = {
    click: (row: Name) => this.router.navigate([`my-names/${row.id}`])
  };

  constructor(
    private router: Router,
    private namesService: INamesService) { }

  ngOnInit(): void {
    this.namesService.getAll()
      .subscribe((names) => this.names = names);
  }

  delete(name: Name): void {
    const idx = this.names.findIndex(n => n.id === name.id);
    if (idx === -1) {
      return;
    }
    this.namesService.delete(name.id);
    this.names.splice(idx, 1);
  }

}
