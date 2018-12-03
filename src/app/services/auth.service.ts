import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  checkCredentials(userCredentials){
    return this.http.post("http://localhost/NEEV/CMS/public/cms/authenticate", userCredentials);
  }
}
