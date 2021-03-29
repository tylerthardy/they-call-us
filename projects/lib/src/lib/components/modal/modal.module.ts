import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { ClrModalModule } from '@clr/angular';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ClrModalModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
