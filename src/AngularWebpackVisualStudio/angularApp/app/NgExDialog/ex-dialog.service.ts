import { Injectable, /* Injector, */ Type } from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog.component';
import { BasicDialogComponent } from './basic-dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class ExDialog {

    constructor(/* injector: Injector,  */private dialogService: DialogService) { }
    
    openMessage(param: any, title?: string, icon?: string) {
        const params: any = this.getParams(param, title, icon);
        params.basicType = 'message';
        this.dialogService.addDialog(BasicDialogComponent, params);
    }
    
    openConfirm(param: any, title?: string, icon?: string): Observable<any> {
        const params: any = this.getParams(param, title, icon);
        params.basicType = 'confirm';
        return this.dialogService.addDialog(BasicDialogComponent, params);
    }

    private getParams(param: any, title?: string, icon?: string): any {
        let params: any = {};
        if (param && typeof param === 'string') {
            // Sigle line inputs.
            params.message = param;
            if (title != undefined && title != '') params.title = title;
            if (icon != undefined && icon != '') params.icon = icon;
        }
        else if (param && typeof param === 'object') {
            params = param;
        }
        return params;
    }

    //Open custom or data dialog by passing custom dialog component and parameters.
    openPrime(component: Type<DialogComponent>, params?: any): Observable<any> {
        return this.dialogService.addDialog(component, params);
    } 
    
    //Allow external call to get dialog components.
    getDialogArray(): DialogComponent[] {
        return this.dialogService.dialogs; 
    }

    //Allow external call to close dialogs.
    clearAllDialogs(dialogComponent: DialogComponent) {
        this.dialogService.removeDialog(dialogComponent, true)
    } 
}