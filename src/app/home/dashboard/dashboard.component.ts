import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
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

  @Output() indexHandler = new EventEmitter<number>();

  showMenu = false;
  isMobile: boolean;
  index = 0;

  constructor() { }

  ngOnInit(): void {
    this.isMobile =  window.innerWidth < 768;
  }

  scrollToBottom() {
    // do scroll only on desktop
    if (window.innerWidth > 768) {
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
    }
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

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 768;
  }

  downIndex() {
    this.indexHandler.emit(--this.index);
  }
  upIndex() {
    this.indexHandler.emit(++this.index);
  }
  resetIndex() {
    this.indexHandler.emit(this.index);
  }
}
