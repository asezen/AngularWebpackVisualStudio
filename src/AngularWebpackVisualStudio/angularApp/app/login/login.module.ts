import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '../NgExDialog/dialog.module';

import { LoginComponent } from './components/login.components';
import { LoginRoutes } from './login.routes';
import { TokenService } from './../core/services/token.service';

import {  DialogService } from "../NgExDialog/dialog.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        DialogModule,
        LoginRoutes,
        
    ],
    providers:[
        DialogService,
        TokenService,
    ],
    declarations: [
        LoginComponent 
    ],

    exports: [
        LoginComponent
    ],
    entryComponents:[  
    ]
})

export class LoginModule { }
