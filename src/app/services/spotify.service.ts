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
  Artist,
  User
} from '../models/spotify.model';
import {
  map, mergeMap
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

export interface AppData {
  time: string;
  type: string;
  image_url: string;
  result: string;
  description: string;
  list: Artist[] | Track[];
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  appData = new Subject<AppData>();

  constructor(private http: HttpClient) {}

  getUsername() {
    return this.api('/me');
  }

  fetchMyTopTracks(limit?: number) {
    if (!limit) {
      limit = 20;
    }
    this.api('/me/top/tracks?limit=' + limit).subscribe((res: TopTracks) => {
      this.appData.next({
        type: 'Track',
        time: 'Top',
        result: res.items[0].name,
        description: res.items[0].artists[0].name,
        image_url: res.items[0].album.images[0].url,
        list: res.items
      });
    });
  }

  fetchMyTopArtists(limit?: number) {
    if (!limit) {
      limit = 20;
    }
    this.api('/me/top/artists?limit=' + limit).subscribe((res: TopArtists) => {
      this.appData.next({
        type: 'Artist',
        time: 'Top',
        result: res.items[0].name,
        description: res.items[0].genres[0],
        image_url: res.items[0].images[0].url,
        list: res.items
      });
    });
  }

  fetchMyTopAlbum() {
    this.api('/me/top/tracks').subscribe((tracks: TopTracks) => {
      const albumsIds = [];
      tracks.items.forEach( track => {
        albumsIds.push(track.album.id);
      });
      this.getAlbum(this.topElementInArray(albumsIds)).subscribe( (res: Album) => {
        this.appData.next({
          type: 'Album',
          time: 'Top',
          result: res.name,
          description: res.artists[0].name,
          image_url: res.images[0].url,
          list: res.tracks.items
        });
      });
    });
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
