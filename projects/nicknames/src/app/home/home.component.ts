import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  zzForm: FormGroup;

  constructor(private modalService: ModalService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.zzForm = this.formBuilder.group({
      test1: null,
      test2: null
    });
  }

  ok(): void {
    console.log(this.zzForm);
    console.log(this.zzForm.value);
  }

  open(): void {
    this.modalService.open({
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
      },
      Ok: (result) => console.log('result', result)
    });
  }
}
