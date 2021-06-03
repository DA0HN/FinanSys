import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule, CategoryFormComponent, CategoryListComponent} from '@/app/pages';
import {CategoryService} from '@/app/pages/categories/shared';
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
