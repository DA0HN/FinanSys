import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@finan$ys/pages/categories/shared';
import { BaseResourceListComponent } from '@finan$ys/shared/components/base-resource-list';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: [ './category-list.component.css' ],
})
export class CategoryListComponent extends BaseResourceListComponent<Category> implements OnInit {

  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }
}
