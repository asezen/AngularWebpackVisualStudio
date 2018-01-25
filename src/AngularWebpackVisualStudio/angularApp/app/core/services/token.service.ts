
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 

import { Configuration } from './../../app.constants';
import { Credential } from '../../models/credential';


@Injectable()
export class TokenService {
 
    private headers: HttpHeaders;

    constructor(private http: HttpClient, private configuration: Configuration) {
 
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getToken(credential:Credential) {
        return this.http.get(this.configuration.ServerWithApiUrl+'token?username='+credential.loginName+'&password='+credential.password, { 
        });

    }

 
}
