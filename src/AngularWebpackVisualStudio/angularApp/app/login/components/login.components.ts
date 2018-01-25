import { Component, OnInit,/* Input,  AfterViewInit */ } from '@angular/core';

import { TokenService } from '../../core/services/token.service';
import { Credential } from '../../models/credential'; 
import { Configuration } from './../../app.constants';   

import { DialogComponent, DialogService/* , ExDialog */ } from "../../NgExDialog/dialog.module";

@Component({
    selector: 'LoginModal',
    templateUrl: './login.components.html',
    // styles:['../../NgExDialog/Css/ex-dialog.css'], 
  })
   
export class LoginComponent extends DialogComponent implements OnInit { 
  
    public thisRef: any = null; 
    public credential: Credential = new Credential();
    closeResult: string;
    constructor(protected dialogService: DialogService
                , private dataService: TokenService, private configuration: Configuration) {
        super(dialogService);     
        this.thisRef = this;
    }
     
    ngOnInit() {  
               
    }
    // AfterViewInit()
    // { 
    //     // this.credential.loginName='Alper';
    //     // this.credential.password='Alper';
    // }
    
    login() {
        this.dataService
            .getToken(this.credential)
            .subscribe(result => { 
                //TODO:Close modal 
                // closeModal('LoginModal'); 
                
                console.log("Response result : " + JSON.stringify(result))
                this.configuration.Token = JSON.parse(  JSON.stringify( result)).access_token;  
                localStorage.setItem('token',this.configuration.Token);
                 
                this.dialogService.removeDialog(this.thisRef);
            }, (error) => {
                console.log(error);
            });
    }
 
    closeModal(){
        this.dialogService.removeDialog(this.thisRef);
    }

    cancel(){
        this.closeModal();
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
         ;
    }
 
    
}
