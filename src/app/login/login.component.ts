import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  deniedPermision = false;
  constructor(private authService: AuthService, private router: Router, private activetedRoute: ActivatedRoute) { }

  login() {
    this.authService.authorizeUser();
  }

  ngOnInit(): void {
    // user already logedin redirect him to home page
    this.authService.user.subscribe(user => {
      if (!!user){
        this.router.navigate(['/home']);
      }
    });

    // this is handke to redirect from spotify with a token
    this.activetedRoute.fragment.subscribe( params => {
      if (params){
        const fragments =  params.split('&').map(item => item.split('='));
        this.authService.login(fragments[0][1], 3600);
        this.router.navigate(['/home']);
      }
    });

    // this handle when the user denied spotify permmisions
    this.activetedRoute.queryParamMap.subscribe(query => {
      if (query.has('error')) {
        this.deniedPermision = true;
      }
    });
  }

}
