import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { catchError, tap } from "rxjs/operators";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  public url: string = "/api/";
  // IMPORTANT: proxy server path is set in ionic.config.json
  // to bypass CORS error

  // = 'http://localhost:8080/Wisdom-war/api/';
  // = `http://is3106-gp12.southeastasia.cloudapp.azure.com:8080/Wisdom-war/api/`;

  constructor(public http: HttpClient) {}

  get(endpoint: string) {
    return this.http
      .get(this.url + endpoint)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError));
  }

  post(endpoint: string, body?: any) {
    return this.http
      .post(this.url + endpoint, body)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError));
  }

  put(endpoint: string, body?: any) {
    return this.http
      .put(this.url + endpoint, body)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError));
  }

  delete(endpoint: string) {
    return this.http
      .delete(this.url + endpoint)
      .pipe(tap(resp => console.log(resp)), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An unknown error has occurred:", error.error.message);
    } else {
      console.error(
        "An HTTP error has occurred: " +
          `HTTP ${error.status}: ${error.error.message}`
      );
    }
    return new ErrorObservable(error);
  }
}
