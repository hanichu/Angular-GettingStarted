import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { IProduct } from './product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
      // in a real worl app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        errorMessage = `Server returned codoe: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}
