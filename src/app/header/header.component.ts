import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { User } from '../models/spotify.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
  username = 'MeaslyKhan';
  @ViewChild('userimg', {static: true}) userImg: ElementRef;

  constructor(private spotify: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.spotify.api('/me').subscribe( (userInfo: User) => {
      this.username = userInfo.display_name;
      this.renderer.setStyle(this.userImg.nativeElement , 'background-image' , `url(${userInfo.images[0].url})`);
    });
  }

}
