import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.3s ease-out', 
                    style({opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({opacity: 1 }),
            animate('.3s ease-in', 
                    style({opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class MenuComponent implements OnInit {
  showMenu = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  closeMenu() {
    this.showMenu = false;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
