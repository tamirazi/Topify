import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SpotifyService } from '../services/spotify.service';
import { AppData } from '../models/appData.model';
import { User, Artist, Track } from '../models/spotify.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  time: string;
  type: string;
  result: string;
  description: string;
  image: string;
  list: Artist[] | Track[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private activadetRoute: ActivatedRoute,
    private spotify: SpotifyService) { }

  ngOnInit(): void {
    console.log('home OnInit');
    
    this.activadetRoute.params.subscribe( (res: any) => {
      this.list = [];
      this.type = this.capitalize(res.type);
      this.time = this.capitalize(res.time);
      this.spotify.fetch(this.time, this.type);
    });
    this.spotify.getUsername().subscribe( (user: User) => {
      console.log(user);
      this.username = user.display_name;
    });
    // this.spotify.fetchMyTopGenre();
    // this.spotify.fetchMyRecentTopTracks();
    // this.spotify.fetchMyRecentTopArtist();
    // this.spotify.fetchMyRecentTopTracks();
    this.spotify.appData.subscribe( (res: AppData) => {
      console.log(res);
      this.time = res.time;
      this.type = res.type;
      this.result = res.result;
      this.image = res.image_url;
      this.description = res.description;
      this.list = res.list;
    });
  }

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['']);
  }

}
