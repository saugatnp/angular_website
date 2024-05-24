import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoaderService } from '../content/services/loader.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private loader: LoaderService
  ) {
  }


  handleError(error: HttpErrorResponse) {
    this.loader.hide()
    return throwError(() => error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();

    // return next.handle(request).pipe(
    //       finalize(() => this.loader.hide()),
    // );
    return next.handle(request).pipe(map(event => {
      if (event instanceof HttpResponse) {
        this.loader.hide()
      }
      return event;
    }),
      catchError((error: HttpErrorResponse) => {
        this.loader.hide()
        return throwError(() => error);
      })
    );
  }



  hideSpinner() {
    this.loader.hide();
  }



}