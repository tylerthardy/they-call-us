import { Component, Inject, OnInit } from '@angular/core';
import { ModalConfig } from './modal.interface';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent {

    config: ModalConfig;
    openModal = false;

    constructor(@Inject('config') config) {
        this.config = config;
    }

    open(): void {
        this.openModal = true;
    }

    cancel(): void {
        this.openModal = false;
    }

    ok(): void {
        this.openModal = false;
        this.config.Ok({});
    }

}
