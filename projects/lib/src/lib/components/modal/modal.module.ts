import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { ClarityModule, ClrModalModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
