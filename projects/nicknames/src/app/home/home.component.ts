import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'lib';
import { ModalConfig } from 'projects/lib/src/lib/components/modal/modal.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private modalService: ModalService,
              private formBuilder: FormBuilder) { }

  open(): void {
    const config: ModalConfig = {
      Title: 'Title',
      Content: 'Content',
      Form: {
        Fields: [
          { Id: 'controlA', Label: 'Control A', Type: 'text' },
          { Id: 'controlB', Label: 'Control B', Type: 'number' }
        ],
        FormGroup: this.formBuilder.group({
            controlA: [null, [Validators.required]],
            controlB: null,
            controlC: null
        })
      }
    };
    this.modalService.open(config).subscribe((result) => console.log(result));
  }
}
