import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {

  categoryOptions = [
    {name :"Select", value: 0},
    {name :"Product", value: 1},
    {name :"Event", value: 2},
    {name :"TV Commercials", value: 3},
    {name :"Others", value: 4}
  ]

  typeOptions = [
    {name :"File", value: 1},
    {name :"URL", value: 2}
 ]

 videoData = {
   title : null,
   type : 1,
   videoFile: null,
   file: null,
   downloadable : 0,
   category :0,
 }

  constructor() { }

  ngOnInit() {
  }

}
