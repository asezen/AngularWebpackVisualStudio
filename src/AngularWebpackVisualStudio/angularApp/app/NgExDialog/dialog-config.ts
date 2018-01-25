export class DialogConfig {
    //Please see properties of calling parameter object in dialog.component.ts.

    //App level settings ----------------
    static topOffset: number = 60;
    static draggable: boolean = true;

    //Animation fade-in time is set in bootstrap.css by default (0.3s).
    //You can overwrite the value in dialog-main.component.css.
    static animation: boolean = true;    

    //Dialog level settings --------------------
    //Background color can also be set in dialog-main.component.css.
    static grayBackground: boolean = true;
    static width: string = '40%';   

    //Animation fade-out time in milliseconds.
    static closeDelay: number = 500;

    //Fade-out time delay in milliseconds for multiple parent dialogs when closing all together.
    static closeDelayParent: number = 10;

    static closeByEnter: boolean = false;
    static closeByEscape: boolean = true;
    static closeByClickOutside: boolean = true;

    //Usually dialog-level only:
    static closeAllDialogs: boolean = false;
    static closeImmediateParent: boolean = false;
    static keepOpenForAction: boolean = false;
    static keepOpenForClose: boolean = false;
    
    //Dialog-level exclusive, no default set but listed here for reference.
    //static beforeActionCallback: any = undefined;
    //static beforeCloseCallback: any = undefined;
    
    //Default values for predefined base type dialogs (message or confirm) only:
    static messageTitle: string = 'Information';    
    static confirmTitle: string = 'Confirmation';

    //Two kinds of button labels in Parameter object for Opening dialog are:
    //actionButtonLabel
    //closeButtonLabel

    //These are for setting defaults only. If passed from parameter object, use these:
    //actionButtonLabel
    //closeButtonLabel
    //--------------------------------------------------------------------
    //Only singel button should be used for basic message dialog, which uses close button pattern by default.
    //Switch to use action button pattern will change button CSS style and set Observable.result = true.
    static messageActionButtonLabel: string = '';
    static messageCloseButtonLabel: string = 'OK'; 

    static confirmActionButtonLabel: string = 'Yes';
    static confirmCloseButtonLabel: string = 'No';     
    //End for setting defaults only----------------------------------------

    static showIcon: boolean = true;
    static messageIcon: string = 'info';
    static confirmIcon: string = 'question';

    //Base type dialog only - no default value set here but list these for references.
    //dialogAddClass
    //headerAddClass
    //titleAddClass
    //bodyAddClass
    //messageAddClass
    //footerAddClass
    //actionButtonAddClass
    //closeButtonAddClass
}
