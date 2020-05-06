import { Component, OnInit, Input } from '@angular/core';
import { Artist, Track } from '../../models/spotify.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './dashboardDesktop.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() type: string;
  @Input() time: string;
  @Input() result: string;
  @Input() description: string;
  @Input() image: string;
  @Input() username: string;
  @Input() list: Artist[] | Track[];
  constructor() { }

  ngOnInit(): void {}

  scrollToBottom() {
    // do scroll only on desktop
    if (window.innerWidth > 768) {
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
    }
  }
}
