import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      input: 'input',
      customInput: 'customInput'
    });
  }

  onsubmit() {
    console.log(this.formGroup.getRawValue(), this.formGroup);
  }
}
