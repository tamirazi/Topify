import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../services/spotify.service';
import { AppData } from '../models/appData.model';
import { User, Artist, Track, SpotifyError } from '../models/spotify.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './homeDesktop.component.scss']
})


export class HomeComponent implements OnInit {
  username: string;
  userId: string;
  time: string;
  type: string;
  result: string;
  description: string;
  image: string;
  list: Track[];
  userImageUrl: string;
  isError = false;
  errMsg: string;
  index = 0;

  constructor(private activadetRoute: ActivatedRoute, private spotify: SpotifyService) { }



  ngOnInit(): void {
    this.index = 0;
    this.activadetRoute.params.subscribe( (res: any) => {
      this.list = [];
      this.type = res.type;
      this.time = res.time;
      this.spotify.fetch(this.time, this.type, this.index);
    });

    this.spotify.getUsername().subscribe( (user: User) => {
      this.username = user.display_name;
      this.userId = user.id;
    })
    this.spotify.appData.subscribe( (res: AppData) => {
      console.log(res);
      this.result = res.result;
      this.image = res.image_url;
      this.description = res.description;
      this.list = res.list;
    });

    this.spotify.error.subscribe( (err: SpotifyError) => {
      this.isError = true;
      if (err.error) {
        this.errMsg = err.error.error.message;
      }
    });


  }

  onHandleAlert() {
    this.isError = !this.isError;
  }

  setIndex(elm) {
    if (this.index !== elm % 3) {
      this.index = elm % 3;
      this.spotify.fetch(this.time, this.type, this.index);
    }
  }



}
