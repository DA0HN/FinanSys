import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Entry, EntryService } from '../shared';
import { Category, CategoryService } from '@finan$ys/pages/categories/shared';
import { BaseResourceFormComponent } from '@finan$ys/shared/components';

interface EntryTypeOption {
  field: string;
  text: string;
}

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: [ './entry-form.component.css' ],
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Category[];

  numberMaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
    dayNamesShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
    dayNamesMin: [ 'Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa' ],
    monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro',
    ],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago',
      'Set', 'Out', 'Nov', 'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  };

  constructor(
    protected injector: Injector,
    private entryService: EntryService,
    private categoryService: CategoryService,
  ) {
    super(injector, entryService);
  }

  get typeOptions(): Array<EntryTypeOption> {
    return Object.entries(Entry.types).map(([ field, text ]) => {
      return {
        field,
        text,
      } as EntryTypeOption;
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  protected buildResourceForm(): void {
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required, Validators.minLength(2) ] ],
      description: [ null ],
      type: [ 'expense', [ Validators.required ] ],
      amount: [ null, [ Validators.required ] ],
      date: [ null, [ Validators.required ] ],
      paid: [ true, [ Validators.required ] ],
      categoryId: [ null, [ Validators.required ] ],
    });
  }

  protected editPageTitle(): string {
    return `Editando Lançamento: ${this.resourceEditedName}`;
  }

  protected newPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected formMapper(data: any): Entry {
    return Entry.from(data);
  }

}
