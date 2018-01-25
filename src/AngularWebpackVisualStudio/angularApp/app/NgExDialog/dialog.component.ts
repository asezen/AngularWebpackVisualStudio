import { Component/* , OnDestroy */ } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { DialogMainComponent } from './dialog-main.component';
import { DialogService } from './dialog.service';

@Component({
    selector: 'dialog-component'
})
export abstract class DialogComponent {

    private observer: Observer<any>;
    protected result: any;
    dialogMain: DialogMainComponent;    
    dialogCallback: any;

    //For passing caller request data items to current dialog component.
    callerData: any;

    //Declared for any component-level custom setting used by TypeScript.
    //Component-level values will be passed from original callers.
    width: string = undefined; 
    grayBackground: boolean = undefined;
    animation: boolean = undefined; 
    draggable: boolean = undefined; 
    closeDelay: number = undefined;
    closeDelayParent: number = undefined;
    closeByClickOutside: boolean = undefined;
    closeByEnter: boolean = undefined;
    closeByEscape: boolean = undefined;
    closeAllDialogs: boolean = undefined;
    closeImmediateParent: boolean = undefined;    
    keepOpenForAction: boolean = undefined;
    keepOpenForClose: boolean = undefined;
    beforeActionCallback: any = undefined;
    beforeCloseCallback: any = undefined;

    //For basic type dialogs only.
    title: string = undefined;
    showIcon: boolean = undefined;
    icon: string = undefined;
    actionButtonLabel: string = undefined;
    closeButtonLabel: string = undefined; 
    dialogAddClass: string = undefined;
    headerAddClass: string = undefined;
    titleAddClass: string = undefined;
    bodyAddClass: string = undefined;
    messageAddClass: string = undefined;
    footerAddClass: string = undefined;
    actionButtonAddClass: string = undefined;
    closeButtonAddClass: string = undefined;

    //Basic dialog type flag (internal use). 
    //Value is set in ExDialog service and used in BasicDialogComponent and DialogMainComponent.
    basicType: string = undefined;

    
    [key: string]: any;

    constructor(protected dialogService: DialogService) { }

    //Set input parameters to component properties.
    fillData(data: any = {}): Observable<any> {
        let keys = Object.keys(data);
        for (let idx = 0, length = keys.length; idx < length; idx++) {
            let key = keys[idx];
            this[key] = data[key];
        }
        return Observable.create((observer:any) => {
            this.observer = observer;
            return () => {
                this.dialogResult();
            }
        });
    }

    //Conditionally close or keep opened dialog and return observer result.
    dialogResult(): void {
        //Callback function that returns an observable and handles before-close callback. Otherwise just close the dialog.
        if (this.result && this.beforeActionCallback)
            this.dialogCallback = this.beforeActionCallback;
        else if (!this.result && this.beforeCloseCallback)
            this.dialogCallback = this.beforeCloseCallback;

        let callBackResult: any;
        if (!this.result && this.beforeCloseCallback && typeof this.beforeCloseCallback === 'function') {
            callBackResult = this.beforeCloseCallback.call(this);
        }
        else if (this.result && this.beforeActionCallback && typeof this.beforeActionCallback === 'function') {
            callBackResult = this.beforeActionCallback.call(this);
        }
        else {
            this.closeDialog();
            return;
        }
        
        if (callBackResult && typeof callBackResult === 'object') {
            callBackResult.subscribe((result:any) => {
                if (result) {
                    this.closeDialog();
                }
                else {
                    return;
                }
            });
        }
        else {
            this.closeDialog();
        }
    }
    
    closeDialog():void {      
        if (this.observer) {
            this.observer.next(this.result);
        }
        if ((this.result && !this.keepOpenForAction) || (!this.result && !this.keepOpenForClose) )
            this.dialogService.removeDialog(this);
    }  
}
