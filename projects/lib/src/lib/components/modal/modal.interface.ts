import { FormGroup } from '@angular/forms';

export interface ModalConfig {
    Title: string;
    Content: string;
    Ok?: (result) => void;
}
