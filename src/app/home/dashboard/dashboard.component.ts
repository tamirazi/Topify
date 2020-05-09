import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Artist, Track } from '../../models/spotify.model';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './dashboardDesktop.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() type: string;
  @Input() time: string;
  @Input() result: string;
  @Input() description: string;
  @Input() image: string;
  @Input() username: string;
  @Input() userId: string;
  @Input() list: Artist[] | Track[];
  @Input() playList: Track[];


  isMobile: boolean;

  constructor(private authService: AuthService, private router: Router, private spotify: SpotifyService) { }

  ngOnInit(): void {}

  scrollToBottom() {
    // do scroll only on desktop
    if (window.innerWidth > 768) {
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
    }
  }
  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['']);
  }

  createPlaylist(event) {
    console.log('dashboard working on new playlist...');
    const playListName = `${this.time.toLocaleUpperCase()} ${this.type.toLocaleUpperCase()} Topify`;    
    // if (this.playList) {
    //   this.spotify.createPlaylistFromTracks(this.userId, playListName, this.list as Track[]);
    // }else {
    //   this.spotify.createPlaylistFromArtist(this.userId, playListName, this.list as Artist[]);
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 768;
  }
}
