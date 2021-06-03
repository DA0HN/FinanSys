import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryListComponent} from './category-list';
import {CategoryFormComponent} from './category-form';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryService} from './shared/category.service';


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
