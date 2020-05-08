import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ICompany } from '../models/interfaces';
import { Company } from '../models/company';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public url: string;

  constructor(private http: HttpClient) {

    this.url = 'http://localhost:8020/companies';

  }

  public getCompanies(): Observable<ICompany[]> {

    return this.http.get<ICompany[]>(this.url).pipe(
      catchError(this.handleError('getCompanies', []))
    );

  }

  public getComapnyName(id: string): Observable<string> {

    const endPoints = id;
    return new Observable(observer => {
      this.http.get(this.url + '/' + endPoints).subscribe((company: Company) => {
        observer.next(company.name);
      });
    });

  }

  public createCompany(company: Company): Observable<Company> {

    return this.http.post<Company>(this.url, company, httpOptions).pipe(
      catchError(this.handleError<Company>('createCompany'))
    );

  }

  public removeCompany(id: string): Observable<any> {

    const endPoints = id;
    return this.http.delete(this.url + '/' + endPoints).pipe(
      catchError(this.handleError('removeCompany', []))
    );

  }

  public handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      // Send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };

  }

  public log(message: string): void {

    console.log(message);

  }

}
