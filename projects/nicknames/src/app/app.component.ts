import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'lib';
import { Environment } from '../environments/environment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private modalService: ModalService,
              private viewContainerRef: ViewContainerRef,
              public environment: Environment) { }

  ngOnInit(): void {
    this.modalService.setViewContainerRef(this.viewContainerRef);
  }

}
