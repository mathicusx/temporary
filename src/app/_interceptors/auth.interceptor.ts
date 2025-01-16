import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../_services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('enters interceptor');
    const token = this.authService.getToken();
    console.log(token);
    const clonedReq = token
      ? req.clone({
          setHeaders: {
            'AUTH-TOKEN': `${token}`,
          },
        })
      : req;

    return next.handle(clonedReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          this.alertService.error('Unauthorized access.');
          localStorage.clear();

          this.router.navigate(['/login']);

          console.error('Unauthorized access - redirecting to login.');
        }

        return throwError(() => error);
      })
    );
  }
}
