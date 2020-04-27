import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TopArtists } from '../models/spotify.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() type: string;
  @Input() time: string;
  @Input() result: string;
  @Input() description: string;
  @Input() image: string;
  constructor() { }

  ngOnInit(): void {}

}
