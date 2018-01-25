import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { DialogHostComponent } from './dialog-host.component';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService  {

    dialogs: any; 
    private dialogHostComponent : DialogHostComponent;
        
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) {}

    /**
    * Adds dialog.
    * @return {Observable<any>}
    */
    addDialog(component:Type<DialogComponent>, data?:any, index?:number): Observable<any> {
        //Create an instance of dialogMainComponent if not exist.
        if (!this.dialogHostComponent) {
            this.dialogHostComponent = this.createDialogHost();
        }
        //Populate dialogs array for access by service caller.
        this.dialogs = this.dialogHostComponent.dialogs;

        return this.dialogHostComponent.addDialog(component, data, index);
    }
    
    //Hides and removes dialog from DOM    
    removeDialog(component: DialogComponent, clearAll: boolean = false): void {      
        if (!this.dialogHostComponent) {
            return;
        }

        //Close all dialogs if clearAll flag is passed.
        if (clearAll) {
            this.dialogHostComponent.removeAllDialogs();
        }
        //Closing all dialogs.
        else if (component.closeAllDialogs)
        {
            this.dialogHostComponent.removeAllDialogs();
        }
        else if (component.closeImmediateParent) {
            this.dialogHostComponent.removeDialogAndParent(component);
        }
        else {
            this.dialogHostComponent.removeDialog(component);
        }        
    }    

    /**
    * Creates and add to DOM top-level dialog host component
    * @return {DialogHostComponent}
    */
    private createDialogHost(): DialogHostComponent {
        
        const componentRef = this.resolver
        .resolveComponentFactory(DialogHostComponent)
        .create(this.injector);
    
        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.applicationRef.attachView(componentRef.hostView);
        
        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        
        // 4. Append DOM element to the body
        document.body.appendChild(domElem);

        return componentRef.instance;
    }     
    
}
