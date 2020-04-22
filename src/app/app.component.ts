import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Topify';

  constructor(
    private activetedRoute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe( params => {
      if(params.access_token){
        this.authService.token = params.access_token;
        this.router.navigate(['/'])
      }
    })
  }


  
}
