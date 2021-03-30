import { FormGroup } from '@angular/forms';

export interface ModalConfig {
    Title: string;
    Content: string;
    Form?: ModalForm;
    Ok?: (result) => void;
}

export interface ModalForm {
    Fields: ModalFormField[];
    FormGroup: FormGroup;
}

export interface ModalFormField {
    Id: string;
    Label: string;
    Type: 'text' | 'number';
}
