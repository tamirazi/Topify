import {
  Injectable
} from '@angular/core';
import {
  HttpHeaders,
  HttpClient
} from '@angular/common/http';

import {
  environment
} from 'src/environments/environment';
import {
  TopTracks,
  Track,
  TopArtists,
  Album,
  Artist
} from '../models/spotify.model';
import {
  map
} from 'rxjs/operators';
import { stringify } from 'querystring';
import { kStringMaxLength } from 'buffer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {}

  getMyTopTracks(limit?: number) {
    if (!limit) {
      limit = 20;
    }
    return this.api('/me/top/tracks?limit=' + limit).pipe(map((res: TopTracks) => res.items));
  }

  getMyTopArtists(limit?: number): Observable<Artist[]> {
    if (!limit) {
      limit = 20;
    }
    return this.api('/me/top/artists?limit=' + limit).pipe(map((res: TopArtists) => res.items));
  }

  getMyTopAlbum(): Observable<Observable<Album>> {
    return this.api('/me/top/tracks').pipe(map((tracks: TopTracks) => {
      const albumsIds = [];
      tracks.items.forEach( track => {
        albumsIds.push(track.album.id);
      });
      // return this.topAlbumId(albumsIds);
      return this.getAlbum(this.topElementInArray(albumsIds));
    }));
  }

  getMyTopGenre(): Observable<string> {
    return this.api('/me/top/artists').pipe(map((artists: TopArtists) => {
      const genres = [];
      artists.items.forEach( artist => {
        artist.genres.forEach( genre => genres.push(genre));
      });
      // return this.topAlbumId(albumsIds);
      return this.topElementInArray(genres);
    }));
  }

  private getAlbum(id: string): Observable<any> {
    return this.api('/albums/' + id);
  }

  private  topElementInArray(array: string[]): string {
    const modeMap = {};
    let maxEl = array[0];
    let maxCount = 1;
    array.forEach(id => {
      if (modeMap[id] === null) {
        modeMap[id] = 1;
      }else {
        modeMap[id]++;
      }
      if (modeMap[id] > maxCount)
      {
          maxEl = id;
          maxCount = modeMap[id];
      }
    });
    return maxEl;

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
