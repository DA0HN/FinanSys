import { Component, Input, OnInit } from '@angular/core';
import { Required } from '@finan$ys/shared/decorators';
import { AbstractControl } from '@angular/forms';

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

  @Input() @Required fieldControl: AbstractControl;

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
    return this.fieldControl.invalid && this.fieldControl.touched;
  }

  private buildErrorMessage(): string | null {
    if ( this.fieldControl.errors.required ) {
      return 'Dado obrigatório';
    }
    if ( this.fieldControl.errors.email ) {
      return 'Formato de email inválido';
    }
    if ( this.fieldControl.errors.minlength ) {
      const requiredMinLength = this.fieldControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${requiredMinLength} caracteres`;
    }
    if ( this.fieldControl.errors.maxlength ) {
      const requiredMaxLength = this.fieldControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${requiredMaxLength} caracteres`;
    }
    return null;
  }
}
