import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  authUrl,
  environment
} from 'src/environments/environment';

import {
  AuthUser
} from '../models/authuser.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
  state: string;
  error ?: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user = new BehaviorSubject<AuthUser>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  authorizeUser() {
    window.location.href = authUrl.url;
  }

  login(token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthUser(token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {

    const userData: {
      // tslint:disable-next-line:variable-name
       _token: string,
      // tslint:disable-next-line:variable-name
       _tokenExpirationDate: Date,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new AuthUser(userData._token, userData._tokenExpirationDate);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  api(endpoint: string) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return this.http.get(environment.API_URL + endpoint, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userData._token
      })
    });

  }


}
