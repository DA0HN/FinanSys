import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { CategoryService } from '@finan$ys/pages/categories/shared';
import { Entry } from './entry.model';
import { BaseResourceService } from '@finan$ys/shared/services/base-resource.service';

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
}
