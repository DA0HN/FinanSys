import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list';
import { CategoryFormComponent } from './category-form';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryService } from './shared/category.service';
import { SharedModule } from '@finan$ys/shared/shared.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent,
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ],
  providers: [
    CategoryService,
  ],
})
export class CategoriesModule {
}
