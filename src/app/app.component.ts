import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ConfigsDataService } from './services/configs-data.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public constructor(private authService: AuthService, private configService: ConfigsDataService, private sotrageService: StorageService){
    authService.checkIfLoggedIn();

   
    this.configService.getLanguages().subscribe(
      (response:any) =>{
        if(response.status == 200){
           this.sotrageService.setCustomData("LANGUAGES", JSON.stringify(response.data));
        }
      }
    );

    this.configService.getRoles().subscribe(
      (response:any) =>{
        if(response.status == 200){
          this.sotrageService.setCustomData("ROLES", JSON.stringify(response.data));
        }
      }
    );

    this.configService.getRegions().subscribe(
      (response:any) =>{
        if(response.status == 200){
          this.sotrageService.setCustomData("REGIONS", JSON.stringify(response.data));
        }
      }
    );

    this.configService.getStates().subscribe(
      (response:any) =>{
        if(response.status == 200){
          this.sotrageService.setCustomData("STATES", JSON.stringify(response.data));
        }
      }
    );

  }

}
