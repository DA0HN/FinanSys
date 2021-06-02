import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryListComponent} from './category-list';
import {CategoryFormComponent} from './category-form';
import {CategoryService} from './shared';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
  ],
  providers: [
    CategoryService,
  ]
})
export class CategoriesModule {
}
