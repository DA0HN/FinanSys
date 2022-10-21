import { Component, Input, OnInit } from '@angular/core';
import { Required } from '@finan$ys/shared/decorators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  styleUrls: [ './form-field-error.component.css' ],
  template: `
    <p class="text-danger">
      {{ message }}
    </p>
  `,
})
export class FormFieldErrorComponent implements OnInit {

  @Input() @Required formControl: FormControl;

  constructor() {
  }

  get message(): string | null {
    if ( this.alreadyTouchedAndInvalid() ) {
      return this.buildErrorMessage();
    }
    return null;
  }

  ngOnInit(): void {
  }

  private alreadyTouchedAndInvalid(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private buildErrorMessage(): string | null {
    if ( this.formControl.errors.required ) {
      return 'Dado obrigatório';
    }
    if ( this.formControl.errors.email ) {
      return 'Formato de email inválido';
    }
    if ( this.formControl.errors.minlength ) {
      const requiredMinLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${requiredMinLength} caracteres`;
    }
    if ( this.formControl.errors.maxlength ) {
      const requiredMaxLength = this.formControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${requiredMaxLength} caracteres`;
    }
    return null;
  }
}
