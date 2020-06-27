import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  isUser = false;
  @Input() option: string;
  @Input() userImgUrl: string;
  @Output() onCloseEmmiter = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) {}
  close() {
    this.onCloseEmmiter.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
