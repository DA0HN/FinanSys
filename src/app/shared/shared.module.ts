import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent, PageHeaderComponent } from '@finan$ys/shared/components';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
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
