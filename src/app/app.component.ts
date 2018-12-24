import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ConfigsDataService } from './services/configs-data.service';
import { StorageService } from './services/storage.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseTitle = 'Tata Motors : NEEV Admin Panel';

  public constructor(private titleService: Title, private route: Router, private actvRoute: ActivatedRoute, private authService: AuthService, private configService: ConfigsDataService, private sotrageService: StorageService){
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

  changeTitle(){
    
    this.route.events.subscribe(
      (val) => {
        const data = this.actvRoute.data;
       // const title = (data && data["title"]) ?  
      }
    );
  }

}
