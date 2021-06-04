import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Entry} from '@/app/pages/entries/shared/entry.model';
import {CategoryService} from '@/app/pages/categories/shared';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient,
              private categoryService: CategoryService
  ) {
  }

  private readonly API: string = '/api/entries';

  private static assignJsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private static jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(data => {
      const entryAssigned = EntryService.assignJsonDataToEntry(data);
      entries.push(entryAssigned);
    });
    return entries;
  }

  private static handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return throwError(error);
  }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.API).pipe(catchError(EntryService.handleError), map(EntryService.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.API}/${id}`;
    return this.http.get<Entry[]>(url).pipe(catchError(EntryService.handleError), map(EntryService.assignJsonDataToEntry));
  }

  create(entry: Entry): Observable<Entry> {
    // Limitação do Angular In Memory Database, necessário realizar relacionamento.
    return this.createRelationshipWithCategoryAndThenExecuteRequest(
      entry,
      () => this.http.post(this.API, entry).pipe(catchError(EntryService.handleError), map(EntryService.assignJsonDataToEntry))
    );
  }

  delete(entry: Entry): Observable<Entry> {
    return this.http.delete(`${this.API}/${entry.id}`).pipe(catchError(EntryService.handleError), map(() => null));
  }

  update(entry: Entry): Observable<Entry> {
    // Limitação do Angular In Memory Database, necessário realizar relacionamento.
    return this.createRelationshipWithCategoryAndThenExecuteRequest(
      entry,
      () => this.http.put(this.API, entry).pipe(catchError(EntryService.handleError), map(() => entry))
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
    executeRequest: (entry: Entry) => Observable<Entry>
  ): Observable<Entry> {
    return this.categoryService
      .getById(entry.categoryId)
      .pipe(mergeMap(category => {
          entry.category = category;

          return executeRequest(entry);
        }
      ));
  }
}
