import { BaseResourceModel } from '../models/base-resource.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  protected constructor(protected apiUrl: string, protected injector: Injector, protected mapper: (json: any) => T) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError),
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T[]>(url)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError),
      );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiUrl, resource)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError),
      );
  }

  delete(resource: T): Observable<T> {
    return this.http.delete(`${this.apiUrl}/${resource.id}`).pipe(
      map(() => null),
      catchError(this.handleError),
    );
  }

  update(resource: T): Observable<T> {
    return this.http.put(this.apiUrl, resource)
      .pipe(
        map(() => resource),
        catchError(this.handleError),
      );
  }

  protected handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return throwError(error);
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.mapper(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(data => resources.push(this.mapper(data)));
    return resources;
  }
}

