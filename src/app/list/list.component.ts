import { Component, OnInit } from '@angular/core';
import { Track, Artist, Album } from '../models/spotify.model';
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

    // this.spotify.getMyTopAlbum().subscribe( albumObs => {
    //   albumObs.subscribe( (album: Album) => {
    //     album.tracks.items.forEach(track => {
    //       console.log(track.name);
    //     });
    //   });
    // });

    this.spotify.getMyTopGenre().subscribe( res => console.log(res));

  }

}
