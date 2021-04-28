import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Vista } from '../enums/vista.enum';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/usuarios/token.service';

@Injectable({
  providedIn: 'root'
})
export class CotizInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const TOKEN: string =  this.tokenService.getToken();

    let request = req;

    if (TOKEN) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${TOKEN}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl((Vista.LOGIN));
        }
        return throwError(err);
      })
    )
  }
}
