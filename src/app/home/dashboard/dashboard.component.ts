import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

import { Track } from '../../models/spotify.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    './dashboardDesktop.component.scss',
  ],
})
export class DashboardComponent implements OnInit {
  @Input() type: string;
  @Input() time: string;
  @Input() result: string;
  @Input() description: string;
  @Input() image: string;
  @Input() username: string;
  @Input() userId: string;
  @Input() list: Track[];
  @Input() index: number;

  @Output() indexHandler = new EventEmitter<number>();

  isMobile: boolean;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    }


  createPlaylist(event) {
    console.log('dashboard working on new playlist...');
    const playListName = `${this.time.toLocaleUpperCase()} ${this.type.toLocaleUpperCase()} Topify`;
    this.spotify.createPlaylistFromTracks(this.userId, playListName, this.list);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 768;
  }

  downIndex() {
    if (this.index > 0) {
      this.indexHandler.emit(--this.index);
    }
  }
  upIndex() {
    if (this.index < 2) {
      this.indexHandler.emit(++this.index);
    }
  }
}
