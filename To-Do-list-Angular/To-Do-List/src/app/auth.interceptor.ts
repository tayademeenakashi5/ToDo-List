import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    // Clone the request and add the token to the headers if it exists
    if (token) {
      request = request.clone({
        setHeaders: {
          //Authorization:`Bearer`+this.authService.getAllUserTasks    //getAuthToken
         Authorization: `Bearer ${token}`
        }
      });
    }
    //console.log('Modified Request:', request);

    return next.handle(request);
  }
}
