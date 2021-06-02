import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Category} from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API: string = '/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API).pipe(catchError(this.handleError), map(this.jsonDataToCategories));
  }

  getById(id: number): Observable<Category> {
    const url = `${this.API}/${id}`;
    return this.http.get<Category[]>(url).pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.API, category).pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  delete(category: Category): Observable<Category> {
    return this.http.delete(`${this.API}/${category.id}`).pipe(catchError(this.handleError), map(() => null));
  }

  update(category: Category): Observable<Category> {
    return this.http.put(this.API, category).pipe(catchError(this.handleError), map(() => category));
  }

  private handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return throwError(error);
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(data => categories.push(data as Category));
    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }
}
