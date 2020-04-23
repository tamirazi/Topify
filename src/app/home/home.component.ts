import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private aurhService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('logout');
    this.aurhService.logout();
    this.router.navigate(['']);
  }

}
