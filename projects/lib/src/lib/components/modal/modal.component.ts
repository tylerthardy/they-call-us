import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalConfig } from './modal.interface';

@Component({
    selector: 'lib-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {

    form: FormGroup;
    openModal = false;
    destroy: () => void;

    constructor(@Inject('config') public config: ModalConfig) {}

    ngOnInit(): void {
        if (!!this.config.Form) {
            this.form = this.config.Form.FormGroup;
        }
    }

    ngOnDestroy(): void {
        console.log('foo destroy');
    }

    cancel(): void {
        this.openModal = false;

        this.destroy();
    }

    ok(): void {
        this.openModal = false;
        if (this.config.Ok) {
            if (!!this.form) {
                if (!this.form.valid) {
                    console.log('not valid');
                    return;
                }
                const result = !!this.form ? this.form.value : null;
                this.config.Ok(result);
            }
        }

        this.destroy();
    }

}
