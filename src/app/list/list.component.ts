import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tracks = [];
  constructor(private spotify: AuthService) { }

  ngOnInit(): void {
    this.spotify.api('/me/top/tracks?limit=20').subscribe( res => {
      console.log(res);
      res.items.forEach(item => {
        this.tracks.push( {
          trackname: item.name,
          artist: item.artists[0].name,
          duration: item.duration_ms,
          img: item.album.images[0].url
        } );
      });
    });
  }

}
