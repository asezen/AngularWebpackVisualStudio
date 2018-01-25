import { Injectable } from '@angular/core';
// import 'angular-jwt';
// import 'jwt-decode';
import { HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired 
    // let jh = new jwtHelper();
    // return jwt != null && !jwtHelper.isTokenExpired(token); 
    //TODO:add Token expiration check. There might be a problem with anguler-jwt type definition. () d.ts)
    return token !=null;
  }

  cachedRequests: Array<HttpRequest<any>> = [];
  public collectFailedRequest(request:any): void {
      this.cachedRequests.push(request);
    }
  public retryFailedRequests(): void {
      // retry the requests. this method can
      // be called after the token is refreshed
    }
    
        
}
