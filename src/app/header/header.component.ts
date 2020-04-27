import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { User } from '../models/spotify.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
  @Input() username: string;

  constructor() { }

  ngOnInit(): void {

  }

}
