import { Component, ViewContainerRef , ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    
  constructor(public viewContainerRef: ViewContainerRef) { 
    
  }

//   method1Call(): void {
//     this.httpClient.get("https://jsonplaceholder.typicode.com/users").subscribe(
//       success => {
//         console.log("Successfully Completed");
//         console.log(success);
//       }
//     );
//   }

//   method2Call(): void {
//     this.httpClient.get("https://jsonplaceholder.typicode.com/user12").subscribe(
//       success => {
//         console.log("Successfully Completed");
//         console.log(success);
//       }
//     );
//   }

 }
