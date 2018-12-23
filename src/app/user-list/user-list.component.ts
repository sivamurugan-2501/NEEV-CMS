import { Component, OnInit } from '@angular/core';
import { TgmService } from '../services/tgm.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  tgmUsers : any= new Array();
  tsmUsers : any= new Array();

  constructor(private userService: TgmService) { }

  ngOnInit() {
     this.load();
  }

  load(){

    this.userService.getUsers("TGM").subscribe(
      (response:any) => {
        
        if(response.status==200){
            this.tgmUsers = response.data;
        }

      },
      (error) => {

      }
    );

    this.userService.getUsers("TSM").subscribe(
      (response:any) => {
        
        if(response.status==200){
            this.tsmUsers = response.data;
        }

      },
      (error) => {

      }
    );
  }

}
