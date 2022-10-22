import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { CategoryService } from '@finan$ys/pages/categories/shared';
import { Entry } from './entry.model';
import { BaseResourceService } from '@finan$ys/shared/services';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService,
  ) {
    super('/api/entries', injector, Entry.from);
  }

  create(entry: Entry): Observable<Entry> {
    return this.createRelationshipWithCategoryAndThenExecuteRequest(
      entry,
      super.create.bind(this),
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.createRelationshipWithCategoryAndThenExecuteRequest(
      entry,
      super.update.bind(this),
    );

  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year)),
      catchError(this.handleError),
    );
  }

  /**
   * Necessário fazer relacionamento entre Category e Entry pela limitação da biblioteca Angular In Memory Database.
   * @param entry Objeto utilizado na criação do relacionamento Entry x Category.
   * @param executeRequest Ação que será executada após a criação do relacionamento.
   * @private
   */
  private createRelationshipWithCategoryAndThenExecuteRequest(
    entry: Entry,
    executeRequest: (entry: Entry) => Observable<Entry>,
  ): Observable<Entry> {
    return this.categoryService
      .getById(entry.categoryId)
      .pipe(mergeMap(category => {
          entry.category = category;
          return executeRequest(entry);
        },
      ), catchError(super.handleError));
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number): Entry[] {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const matchMonth = entryDate.month() + 1 === (+month);
      const matchYear = entryDate.year() === (+year);
      return matchMonth && matchYear;
    });
  }
}
