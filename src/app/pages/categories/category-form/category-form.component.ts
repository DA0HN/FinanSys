import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category, CategoryService} from '@/app/pages/categories/shared';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  category = new Category();


  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  private setCurrentAction(): void {
    const LAST_SEGMENT_URL = 0;
    if (this.route.snapshot.url[LAST_SEGMENT_URL].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  private loadCategory(): void {
    if (this.currentAction === 'edit') {
      this.route.params.pipe(
        switchMap(params =>
          this.categoryService.getById(+params.get('id'))
        )
      ).subscribe(
        (category) => {
          this.category = category;
          // binds loaded category data to CategoryForm
          this.categoryForm.patchValue(category);
        },
        _ => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
  }

  private setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editando categoria: ${categoryName}`;
    }
  }
}
