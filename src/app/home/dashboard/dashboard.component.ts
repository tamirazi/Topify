import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Artist, Track } from '../../models/spotify.model';
import { AuthService } from 'src/app/services/auth.service';


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

  isMobile: boolean;

  constructor(private authService: AuthService, private router: Router) { }

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
  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 768;
  }
}
