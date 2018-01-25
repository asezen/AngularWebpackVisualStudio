import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, /* ReflectiveInjector, */ Type} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogMainComponent } from './dialog-main.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'dialog-host',
    template: '<template #element></template>'    
})
export class DialogHostComponent {
    
    //Target element to insert dialogs.    
    @ViewChild('element', {read: ViewContainerRef}) private element: ViewContainerRef;

    //Array to hold multiple dialogs.
    dialogs: Array<DialogComponent> = [];    

    constructor(private resolver: ComponentFactoryResolver) {}

    /**
    * Adds dialog    
    * @return {Observable<any>}
    */
    addDialog(component:Type<DialogComponent>, data?:any, index?:number):Observable<any> {
        let factory = this.resolver.resolveComponentFactory(DialogMainComponent);
        let componentRef = this.element.createComponent(factory, index);
        let dialogMain: DialogMainComponent = <DialogMainComponent> componentRef.instance;
        let _component: DialogComponent = dialogMain.addComponent(component);
        if (typeof (index) !== 'undefined') {
            this.dialogs.splice(index, 0, _component);
        }
        else {
            this.dialogs.push(_component);
        }

        setTimeout(() => {
            dialogMain.show();
        });
        return _component.fillData(data);
    }
    
    //Removes open dialog.    
    removeDialog(component: DialogComponent, closeDelay?: number) {        
        let delayMs = closeDelay == undefined ? component.closeDelay : closeDelay; 
        //No visible delay if no animaion fade in.
        if (!component.animation)
            delayMs = 5;        
        component.dialogMain.hide();
        setTimeout(() => {
            let index = this.dialogs.indexOf(component);
            if (index > -1) {
                this.element.remove(index);
                this.dialogs.splice(index, 1); 
            }             
        }, delayMs);        
    }

    //Remove open dialog and its immediate parent dialog.
    removeDialogAndParent(component: DialogComponent) {
        let _thisRef = this;
        let dialogIndex = this.dialogs.indexOf(component);
        this.dialogs.forEach(function (value, index) {
            if (index == dialogIndex || index == dialogIndex - 1) {                
                _thisRef.removeDialog(value, _thisRef.getCloseDelayForParent(value, index));
            }
        });
    } 

    //Removes all multiple opened dialogs.    
    removeAllDialogs() {        
        let _thisRef = this;
        this.dialogs.forEach(function (value, index) {            
            _thisRef.removeDialog(value, _thisRef.getCloseDelayForParent(value, index));
        });
    }

    //Get close delay milliseconds for parent dialog with reduced time.
    private getCloseDelayForParent(component: DialogComponent, index: number): number {
        let closeDelayParent: number;
        if (index < this.dialogs.length - 1) {
            closeDelayParent = component.closeDelay == undefined ? component.closeDelayParent : component.closeDelay;
        }
        else {
            closeDelayParent = component.closeDelay;
        }
        return closeDelayParent;
    }
}
