import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private localStorage: LocalStorage) { }

  storeUserData(userData){
    localStorage.setItem('cmsUserData', userData);
  }

  setToken(appToken){
    localStorage.setItem('cmsAppToken', appToken);
  }

  

}
