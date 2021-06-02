import {Component, OnInit} from '@angular/core';
import {Category, CategoryService} from '../shared';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      _ => alert('Erro ao carregar a lista')
    );
  }

  deleteCategory(category: Category): void {
    const mustDelete = confirm('Vocẽ realmente deseja excluir este item?');

    if (mustDelete) {
      this.categoryService.delete(category).subscribe(
        () => this.categories = this.categories.filter(cat => cat != category),
        _ => alert(`Erro ao tentar excluir`)
      );
    }
  }
}
