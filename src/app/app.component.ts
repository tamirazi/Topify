import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { map, take} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Topify';

  constructor(
    private authService: AuthService) {}


  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
