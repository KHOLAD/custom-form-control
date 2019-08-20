import {ChangeDetectionStrategy, Component, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, ControlValueAccessor {
  /** Placeholder text */
  @Input() placeholder = 'Placeholder';
  /** Form field type */
  @Input() type: 'text' | 'select' = 'text';
  /** Is this field required */
  @Input() required = false;
  /**Main value*/
  private _value: string;
  /**Value Accessor callbacks*/
  private onChange: (_: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  ngOnInit(): void {
    if (
      this.ngControl
      && this.ngControl.control
      && this.ngControl.control.validator
      && this.ngControl.control.validator(this.ngControl.control)
      && this.ngControl.control.validator(this.ngControl.control).required
    ) {
      this.required = true;
    }
  }

  onChanges($event: EventTarget) {
    this.value = ($event as HTMLInputElement).value;
    this.onChange(this._value);
    this.onTouched();
  }

  // ControlValueAccessor methods implementation
  writeValue(val: any): void { this.value = val; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn;}
}
