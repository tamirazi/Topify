import { Component, OnInit } from '@angular/core';
import { Track, Artist } from '../models/spotify.model';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tracks: Track[];
  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.spotify.getMyTopTracks(20).subscribe( (tracks: Track[]) => {
      this.tracks = tracks;
    });
  }

}
