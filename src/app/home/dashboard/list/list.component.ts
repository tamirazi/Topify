import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Track } from '../../../models/spotify.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
  @Input() list: Track[];
  @Input() type: string;
  @Input() time: string;
  @Output() savePlaylistEmitter = new EventEmitter();

  playlistCreated = false;
  creatingPlaylist = false;
  playlistURI: string;
  playlistWebLink: string;
  totalDuration = 0;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.spotify.playlistCreated.subscribe((res) => {
      this.creatingPlaylist = false;
      this.playlistCreated = true;
      this.playlistURI = res.uri;
      this.playlistWebLink = res.external_urls.spotify;
    });
  }

  ngOnChanges(changes): void {
    this.totalDuration = 0;
    this.playlistCreated = false;
    this.list.forEach((element: any) => {
      this.totalDuration += element.duration_ms;
    });
  }

  savePlayList() {
    if (!this.playlistCreated) {
      this.creatingPlaylist = true;
      this.savePlaylistEmitter.emit('new Playlist');
    }
  }
}
