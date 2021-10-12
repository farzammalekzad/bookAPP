import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DomainUrl} from './domain';

@Injectable({
  providedIn: 'root'
})


export class Intercept implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myRequest = req.clone({
      url: DomainUrl + req.url,
      headers: req.headers.append('Content-Type', 'application/json')
    });
    return next.handle(myRequest);
  }
}

