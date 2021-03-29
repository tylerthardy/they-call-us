import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private modalService: ModalService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.modalService.setViewContainerRef(this.viewContainerRef);
  }

}
