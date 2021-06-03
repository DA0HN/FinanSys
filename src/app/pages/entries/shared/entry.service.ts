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
    return this.http.post(this.API, entry).pipe(catchError(EntryService.handleError), map(EntryService.assignJsonDataToEntry));
  }

  delete(entry: Entry): Observable<Entry> {
    return this.http.delete(`${this.API}/${entry.id}`).pipe(catchError(EntryService.handleError), map(() => null));
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put(this.API, entry).pipe(catchError(EntryService.handleError), map(() => entry));
  }

}
