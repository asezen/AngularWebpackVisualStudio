import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogHostComponent } from './dialog-host.component';
import { DialogMainComponent } from './dialog-main.component';
import { DialogService } from './dialog.service';
import { ExDialog } from './ex-dialog.service';
import { DraggableDirective } from './draggable.directive';
import { VerticalCenterDirective } from './vertical-center.directive';
import { FocusBlurDirective } from './focus-blur.directive';
import { DialogIconDirective } from './dialog-icon.directive';
import { BasicDialogComponent } from './basic-dialog.component';
/* import { DialogCache } from './dialog-cache'; */

export { DialogComponent } from './dialog.component';
export { DialogService } from './dialog.service';
export { ExDialog } from './ex-dialog.service';
export { FocusBlurDirective } from './focus-blur.directive';
export { DialogCache } from './dialog-cache';

@NgModule({
    declarations: [
        DialogHostComponent,
        DialogMainComponent,
        DraggableDirective,
        VerticalCenterDirective,
        FocusBlurDirective,
        DialogIconDirective,
        BasicDialogComponent
    ],
    providers: [
        DialogService,
        ExDialog
    ],
    imports: [
        CommonModule
    ],
    exports: [        
        BasicDialogComponent,
        FocusBlurDirective
    ],
    entryComponents: [
        DialogHostComponent,
        DialogMainComponent,
        //SW: also need to declare these items as entryComponent.
        BasicDialogComponent
    ]
})
export class DialogModule {    
}
