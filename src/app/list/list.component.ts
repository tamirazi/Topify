import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TopTracks, Track } from '../models/spotify.model';
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
    this.spotify.getMyTopTracks(3).subscribe( (tracks) => {
      this.tracks = tracks;
      tracks.forEach( track => console.log(track));
    });
  }

}
