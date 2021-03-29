import { Component, OnInit } from '@angular/core';
import { ModalService } from 'lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modalService.open({
      Title: 'Title',
      Content: 'Content',
      Ok: (result) => console.log('result', result)
    });
  }
}
