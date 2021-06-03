import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Entry} from '@/app/pages/entries/shared/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) {
  }

  private readonly API: string = '/api/entries';

  private static jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private static handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return throwError(error);
  }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.API).pipe(catchError(EntryService.handleError), map(this.jsonDataToEntries));
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.API}/${id}`;
    return this.http.get<Entry[]>(url).pipe(catchError(EntryService.handleError), map(EntryService.jsonDataToEntry));
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.API, entry).pipe(catchError(EntryService.handleError), map(EntryService.jsonDataToEntry));
  }

  delete(entry: Entry): Observable<Entry> {
    return this.http.delete(`${this.API}/${entry.id}`).pipe(catchError(EntryService.handleError), map(() => null));
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put(this.API, entry).pipe(catchError(EntryService.handleError), map(() => entry));
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(data => entries.push(data as Entry));
    return entries;
  }

}
