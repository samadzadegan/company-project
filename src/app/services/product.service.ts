import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IProduct } from '../models/interfaces';
import { Product } from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url: string;

  constructor(private http: HttpClient) {

    this.url = 'http://localhost:8020/products';

  }

  public getProducts(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>(this.url).pipe(
      catchError(this.handleError('getProducts', []))
    );

  }

  public getProductByCompanyId(companyId: string): Observable<IProduct[]> {

    let foundProducts = [];
    return new Observable(observer => {
      this.getProducts().subscribe(res => {
        foundProducts = res;
        observer.next(foundProducts.filter(p => p.idCompany === companyId));
      }, err => {
        observer.error(err);
      });
    });

  }

  public createProduct(product: Product): Observable<Product> {

    return this.http.post<Product>(this.url, product, httpOptions).pipe(
      catchError(this.handleError<Product>('createProduct'))
    );

  }

  public removeProduct(id: string): Observable<any> {

    const endPoints = id;
    return this.http.delete(this.url + '/' + endPoints).pipe(
      catchError(this.handleError('removeProduct', []))
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
