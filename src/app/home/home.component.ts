import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpotifyService, AppData } from '../services/spotify.service';
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
    private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.spotify.getUsername().subscribe( (user: User) => {
      console.log(user);
      this.username = user.display_name;
    });
    this.spotify.fetchMyTopArtists();

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

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['']);
  }

}
