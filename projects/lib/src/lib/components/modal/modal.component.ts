import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalConfig } from './modal.interface';

@Component({
    selector: 'lib-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {

    form: FormGroup;
    openModal = true;
    destroy: () => void;
    afterDestroy = new Subject<any>();

    private result: any;

    constructor(@Inject('config') public config: ModalConfig,
                @Inject(DOCUMENT) private document,
                private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        if (!!this.config.Form) {
            this.initializeForm();
        }
    }

    ngOnDestroy(): void {
        this.afterDestroy.next(this.result);
        this.afterDestroy.complete();
    }

    initializeForm(): void {
        if (this.config.Form.Fields.length === 0) {
            throw new Error('No fields specified for modal with ModalConfig.Form attribute');
        }

        if (!!this.config.Form.FormGroup) {
            this.form = this.config.Form.FormGroup;
        } else {
            this.form = this.formBuilder.group({});
            this.config.Form.Fields.forEach(
                (field) => this.form.addControl(field.Id, new FormControl()));
        }

        // Hack around fields not being available until shortly after ngOnInit()
        setTimeout(() => {
            const firstKey = this.config.Form.Fields[0].Id;
            const firstField = this.document.querySelector(`input[ng-reflect-name="${firstKey}"]`);
            firstField.focus();
        }, 0);
    }

    cancel(): void {
        this.openModal = false;

        this.destroy();
    }

    ok(): void {
        if (!!this.form) {
            if (!this.form.valid) {
                console.log('not valid');
                return;
            }
            const result = !!this.form ? this.form.value : null;
            this.result = result;
        }

        this.destroy();
        this.openModal = false;
    }

}
