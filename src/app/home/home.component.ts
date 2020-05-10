import { Component, OnInit, HostListener } from '@angular/core';
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
  list: Artist[] | Track[];
  playList: Track[];
  userImageUrl: string;
  isError = false;
  errStatus: number;
  errMsg: string;

  constructor(private activadetRoute: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.activadetRoute.params.subscribe( (res: any) => {
      this.list = [];
      this.type = res.type;
      this.time = res.time;
      this.spotify.fetch(this.time, this.type);
    });
    this.spotify.getUsername().subscribe( (user: User) => {
      console.log(user);
      this.username = user.display_name;
      this.userId = user.id;
      this.userImageUrl = user.images[0].url;
    });
    this.spotify.appData.subscribe( (res: AppData) => {
      console.log(res);
      this.result = res.result;
      this.image = res.image_url;
      this.description = res.description;
      this.list = res.list;
      this.playList = res.playList;
    });

    this.spotify.error.subscribe( (err: SpotifyError) => {
      this.isError = true;
      if (err.error) {
        this.errStatus = err.error.error.status;
        this.errMsg = err.error.error.message;
      }
    });


  }

  onHandleAlert() {
    this.isError = !this.isError;
  }



}
