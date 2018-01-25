import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from './Interceptors/httpinterceptor'
import { AuthService } from './auth/auth.service' 


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module'; 
import { SharedModule } from './shared/shared.module';
import { DialogModule } from './NgExDialog/dialog.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/components/login.components'; 



@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutes,
        SharedModule,
        CoreModule.forRoot(),
        HomeModule,
        LoginModule ,
        DialogModule,        
    
    ],
    providers: [AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        }],
    declarations: [
        AppComponent
    ],

    bootstrap: [AppComponent],
    entryComponents: [
        LoginComponent                
    ],
})

export class AppModule { }
