import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {environment} from 'src/environments/environment';
import {TopTracks, Track} from '../models/spotify.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getMyTopTracks(limit?: number) {
    if (!limit) {
      limit = 20;
    }
    return this.api('/me/top/tracks?limit=' + limit).pipe( map((res: TopTracks ) => res.items));
  }

  private api(endpoint: string) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return this.http.get(environment.API_URL + endpoint, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userData._token
      })
    });

  }
}
