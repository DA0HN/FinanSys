import { BaseResourceModel } from '../models/base-resource.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  constructor(protected http: HttpClient, protected apiUrl: string) {
  }

  protected static handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return throwError(error);
  }


  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(catchError(BaseResourceService.handleError), map(this.jsonDataToResources));
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T[]>(url).pipe(catchError(BaseResourceService.handleError), map(this.jsonDataToResource));
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiUrl, resource)
      .pipe(
        catchError(BaseResourceService.handleError),
        map(this.jsonDataToResource),
      );
  }

  delete(resource: T): Observable<T> {
    return this.http.delete(`${this.apiUrl}/${resource.id}`).pipe(catchError(BaseResourceService.handleError), map(() => null));
  }

  update(resource: T): Observable<T> {
    return this.http.put(this.apiUrl, resource).pipe(catchError(BaseResourceService.handleError), map(() => resource));
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(data => resources.push(data as T));
    return resources;
  }
}

