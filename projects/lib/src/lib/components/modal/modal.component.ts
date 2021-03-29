import { Component, Inject, OnInit } from '@angular/core';
import { ModalConfig } from './modal.interface';

@Component({
    selector: 'lib-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

    config: ModalConfig;
    openModal = false;

    constructor(@Inject('config') config) {
        this.config = config;
    }

    ngOnInit(): void {
    }

    open(): void {
        this.openModal = true;
    }

    cancel(): void {
        this.openModal = false;
    }

    ok(): void {
        this.openModal = false;
        if (this.config.Ok) {
            this.config.Ok({});
        }
    }

}
