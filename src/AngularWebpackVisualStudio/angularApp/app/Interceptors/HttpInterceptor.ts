
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
 
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../login/components/login.components';
import { ExDialog } from "../NgExDialog/dialog.module";
  


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService, private exDialog: ExDialog) { 

    }
    public isLoginDialogOpen : boolean = false;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('intercepted the HTTP req');
        // debugger;
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
 
       if(!this.auth.isAuthenticated() && req.url.indexOf('/api/token') < 0 && !this.isLoginDialogOpen ){ 
                this.exDialog.openPrime(LoginComponent, {
                    width: '450px',
                    callerData: {  }, //Pass non-dialog data.
                    //animation: false,
                    //grayBackground: false            
                })
                .subscribe((result) => {
                  this.isLoginDialogOpen = false;
                   if (result) {                
                   }
                   else {
                   }
                })
                ;
                this.isLoginDialogOpen = true;
        }
        
        if (!req.headers.has('Authorization') && this.auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.auth.getToken()}`
                }
              });
          
        }

        
        console.log(JSON.stringify(req.headers));
        // return next.handle(req);
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log("unauthorized request response is handled.");
                this.auth.collectFailedRequest(req);
                
                // redirect to the login route
                // or show a modal

              }
            }
          });
    }
}