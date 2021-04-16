import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatagridOptions } from 'dist/lib/lib/components/datagrid/datagrid.interface';
import { ModalService } from 'lib';
import { DatagridColumn } from 'projects/lib/src/lib/components/datagrid/datagrid.interface';
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
    { Id: 'delete', Name: 'Delete', Icon: 'trash', Type: 'icon-button', Click: (row: Name) => this.delete(row) }
  ];

  options: DatagridOptions = {
    click: (row: Name) => this.router.navigate([`my-names/${row.id}`])
  };

  constructor(
    private router: Router,
    private modalService: ModalService,
    private namesService: INamesService) { }

  ngOnInit(): void {
    this.namesService.getAll()
      .subscribe((names) => this.names = names);
  }

  delete(name: Name): void {
    this.modalService.open({
      Title: 'Really Delete?',
      Content: `Are you sure you want to delete '${name.rootName}?`,
    }).subscribe((result: any) => {
      if (result) {
        const idx = this.names.findIndex(n => n.id === name.id);
        if (idx === -1) {
          return;
        }
        this.namesService.delete(name.id);
        this.names.splice(idx, 1);
      }
    });
  }

}
