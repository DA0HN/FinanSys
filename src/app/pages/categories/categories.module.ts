import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryListComponent} from './category-list';
import {CategoryFormComponent} from './category-form';
import {CategoryService} from './shared';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService,
  ]
})
export class CategoriesModule {
}
