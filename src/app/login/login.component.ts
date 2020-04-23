import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activetedRoute: ActivatedRoute) { }

  login() {
    console.log('login');
    this.authService.authorizeUser();
  }

  ngOnInit(): void {
    // if someone get here and his already logedin, redirect him
    if (this.authService.isLogedin()) {
      console.log('User is loged in');
      this.router.navigate(['/home']);
    }
    this.activetedRoute.fragment.subscribe( params => {
      if (params){
        const fragments =  params.split('&').map(item => item.split('='));
        const exp = new Date();
        exp.setSeconds(exp.getSeconds() + 3600);
        this.authService.saveLogin(fragments[0][1], exp.toString());
        this.router.navigate(['/home']);
      }
    });
  }

}
