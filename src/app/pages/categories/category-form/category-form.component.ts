import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Category, CategoryService } from '@finan$ys/pages/categories/shared';
import { BaseResourceFormComponent } from '@finan$ys/shared/components/base-resource-form';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: [ './category-form.component.css' ],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {


  constructor(
    protected injector: Injector,
    protected categoryService: CategoryService,
  ) {
    super(injector, categoryService);
  }

  protected newPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected editPageTitle(): string {
    return `Editando categoria ${this.resourceEditedName}`;
  }

  protected buildResourceForm(): void {
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required, Validators.minLength(2) ] ],
      description: [ null ],
    });
  }

  protected formMapper(data: any): Category {
    return Category.from(data);
  }
}
