import { BaseResourceModel } from '../models/base-resource.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  protected constructor(protected apiUrl: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  protected handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return throwError(error);
  }


  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T[]>(url).pipe(catchError(this.handleError), map(this.jsonDataToResource));
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiUrl, resource)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToResource),
      );
  }

  delete(resource: T): Observable<T> {
    return this.http.delete(`${this.apiUrl}/${resource.id}`).pipe(catchError(this.handleError), map(() => null));
  }

  update(resource: T): Observable<T> {
    return this.http.put(this.apiUrl, resource).pipe(catchError(this.handleError), map(() => resource));
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(data => resources.push(data as T));
    return resources;
  }
}

