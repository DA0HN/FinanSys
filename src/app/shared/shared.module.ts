import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent, PageHeaderComponent } from '@finan$ys/shared/components';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    BreadCrumbComponent,
    PageHeaderComponent,
  ],
})
export class SharedModule {
}
