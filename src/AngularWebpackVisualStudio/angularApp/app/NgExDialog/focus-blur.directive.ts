import { Directive, Input, /* ElementRef, */ AfterViewInit } from '@angular/core';
@Directive({
    selector: '[focus-blur]'
})

export class FocusBlurDirective implements AfterViewInit {
    constructor(/* private element: ElementRef */) {
    }
    //Set focus as default.
    @Input('focus-blur') option: string;
    
    ngAfterViewInit() {        
        let pThis: any = this;
        setTimeout(() => {
            if (pThis.option == 'focus' || pThis.option == 'focus_blur') {
                pThis.element.nativeElement.focus();
            }
            if (pThis.option == 'blur' || pThis.option == 'focus_blur') {
                pThis.element.nativeElement.blur();
            }
        }, 10);        
    }
}