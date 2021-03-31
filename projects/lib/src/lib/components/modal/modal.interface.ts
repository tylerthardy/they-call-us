import { FormGroup, ValidatorFn } from '@angular/forms';

export interface ModalConfig {
    Title: string;
    Content?: string;
    Form?: ModalForm;
}

export interface ModalForm {
    Fields: ModalFormField[];
    FormGroup?: FormGroup;
}

export interface ModalFormField {
    Id: string;
    Label: string;
    Type: 'text' | 'number';
    Value?: any;
    Validators?: ValidatorFn[];
}
