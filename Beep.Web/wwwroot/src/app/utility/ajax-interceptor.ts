import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { AjaxInterceptorService, InterceptorSettings } from '../services/ajax-interceptor.service';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
    settings: InterceptorSettings;

    constructor(private _ajaxInterceptorSvc: AjaxInterceptorService, private _snack: MatSnackBar, private _router: Router) {
        this._ajaxInterceptorSvc.settings().subscribe(a => this.settings = a);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<any> {
        return next.handle(req).pipe(
            map(event => {
                this._ajaxInterceptorSvc.setProgressSMasktatus(true);
                if (event instanceof HttpResponse) {
                    if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
                        if ((!this.settings || !this.settings.ignoreSuccessSnack) && !req.url.toLowerCase().endsWith('login') && !req.url.toLowerCase().endsWith('logout')) {
                            this._snack.open('Success!', 'X', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center', panelClass: 'snack-success' })
                                .afterDismissed().subscribe(
                                    () => {
                                        if (this.settings &&
                                            this.settings.redirectUrl) {
                                            this._router.navigateByUrl(this.settings.redirectUrl);
                                            this._ajaxInterceptorSvc.setSettings();
                                        }
                                    }
                                )
                        } else if (this.settings &&
                            this.settings.redirectUrl) {
                            this._router.navigateByUrl(this.settings.redirectUrl);
                            this._ajaxInterceptorSvc.setSettings();
                        }
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this._ajaxInterceptorSvc.setProgressSMasktatus(true);
                this._ajaxInterceptorSvc.setSettings();
                if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
                    if (error.status == 500)
                        this._snack.open('Something went wrong. Please try again!', 'X', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center', panelClass: 'snack-error' });
                    else if (error.status != 400)
                        this._router.navigateByUrl('/error/500');
                } else if (req.method == 'GET' && error.status != 400) {
                    this._router.navigateByUrl('/error/500');
                }
                throw (error);
            }),
            finalize(() => {
                this._ajaxInterceptorSvc.setProgressSMasktatus(false);
            })
        )
    }
}