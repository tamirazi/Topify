import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TopArtists } from '../models/models.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topArtistName: string;
  topArtistFollowers: number;
  @ViewChild('artistImg', {static: true}) artistImg: ElementRef;
  constructor(private spotify: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.spotify.api('/me/top/artists?limit=1').subscribe( (res: TopArtists) => {
      this.topArtistName = res.items[0].name;
      this.topArtistFollowers = res.items[0].followers.total;
      this.renderer.setStyle(this.artistImg.nativeElement,  'background-image' , `url(${res.items[0].images[0].url})`);
    });
  }

}
