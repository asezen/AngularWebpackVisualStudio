import { Component, Input, OnInit } from '@angular/core';

import { TokenService } from '../core/services/token.service';
import { Credential } from '../models/credential';
import { ModalService } from '../core/services/modal.service';
import { Configuration } from './../app.constants';
import * as $ from 'jquery';

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    template: '<ng-content></ng-content>'
})

export class LoginComponent implements OnInit {
    @Input() id: string;
    private element: JQuery;

    credential: Credential = new Credential();

    constructor(private dataService: TokenService, private modalService: ModalService, private configuration: Configuration) { 
    }

    ngOnInit() { 
          let modal = this;
        
               // ensure id attribute exists
               if (!this.id) {
                   console.error('modal must have an id');
                   return;
               }
        
               // move element to bottom of page (just before </body>) so it can be displayed above everything else
               this.element.appendTo('body');
        
               // close modal on background click
               this.element.on('click', function (e: any) {
                   var target = $(e.target);
                   if (!target.closest('.modal-body').length) {
                       modal.close();
                   }
               });
        
               // add self (this modal instance) to the modal service so it's accessible from controllers
               this.modalService.add(this);
    }

    login() {
        this.dataService
            .getToken(this.credential)
            .subscribe(result => { 
                //TODO:Close modal 
                // closeModal('LoginModal'); 
                
                console.log("Response result : " + result)
                this.configuration.Token = JSON.parse(  JSON.stringify( result)).access_token;  
                localStorage.setItem('token',this.configuration.Token);
                this.modalService.close('LoginModal');
            }, (error) => {
                console.log(error);
            });
    }
 
    closeModal(id: string){
        this.modalService.close(id);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }
 
    // open modal
    open(): void {
        this.element.show();
        $('body').addClass('modal-open');
    }
 
    // close modal
    close(): void {
        this.element.hide();
        $('body').removeClass('modal-open');
    }
}
