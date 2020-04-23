import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { authUrl, environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  token: string;

  constructor(private http: HttpClient) {}

  authorizeUser() {
    window.location.href = authUrl.url;
  }

  isLogedin() {
    const accessToken = window.localStorage.getItem('accessToken');
    if (!accessToken) {
      return false;
    }
    return true;
  }
  saveLogin(token: string, expires: string) {
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('expires_in', expires);
  }

  logout() {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('expires_in');
  }

  api(endpoint: string) {
    if (this.isLogedin()) {
      return this.http.get(environment.API_URL + endpoint ,
        {
          headers: new HttpHeaders({Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')})
        });
    }
    return null;
  }


}
