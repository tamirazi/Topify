import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';

import {environment} from 'src/environments/environment';
import {TopTracks, Track, TopArtists, Album, Artist } from '../models/spotify.model';
import { AppData, AppDataObject, CONSTS } from '../models/appData.model';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  appData = new Subject<AppData>();
  private token: string;
  constructor(private http: HttpClient) { }

  fetch(time: string, type: string) {
    switch (time) {
      case CONSTS.TOP:
        switch (type) {
          case CONSTS.ARTIST:
            this.fetchMyTopArtists();
            break;
          case CONSTS.TRACK:
            this.fetchMyTopTracks();
            break;
          case CONSTS.ALBUM:
            this.fetchMyTopAlbum();
            break;
          case CONSTS.GENRE:
            this.fetchMyTopGenre();
            break;
        }
        break;
      case CONSTS.RECENT:
        switch (type) {
          case CONSTS.ARTIST:
            this.fetchMyRecentTopArtist();
            break;
          case CONSTS.TRACK:
            this.fetchMyRecentTopTracks();
            break;
          case 'album':
            break;
          case 'genre':
            break;
        }
        break;

      default:

    }
  }

  getUsername() {
    return this.api('/me');
  }

  fetchMyTopTracks(limit?: number) {
    if (!limit) {
      limit = 20;
    }
    this.api('/me/top/tracks?limit=' + limit).subscribe((res: TopTracks) => {
      this.appData.next({
        type: CONSTS.TRACK,
        time: CONSTS.TOP,
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
        type: CONSTS.ARTIST,
        time: CONSTS.TOP,
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
      tracks.items.forEach(track => {
        albumsIds.push(track.album.id);
      });
      this.api('/albums/' + this.topElementInArray(albumsIds)).subscribe((res: Album) => {
        this.appData.next({
          type: CONSTS.ALBUM,
          time: CONSTS.TOP,
          result: res.name,
          description: res.artists[0].name,
          image_url: res.images[0].url,
          list: res.tracks.items
        });
      });
    });
  }

  fetchMyTopGenre() {
    this.api('/me/top/artists').subscribe((artists: TopArtists) => {
      const genres = [];
      artists.items.forEach(artist => {
        artist.genres.forEach(genre => genres.push(genre));
      });
      const topGenre = this.topElementInArray(genres);
      this.api('/recommendations?seed_genres=' + topGenre + ',' + genres.find(genre => genre !== topGenre))
      .pipe( map( (res: any) => res.tracks))
      .subscribe( (tracks: Track[]) => {
        console.log(tracks);
        this.appData.next({
          type: CONSTS.GENRE,
          time: CONSTS.TOP,
          result: topGenre,
          description: 'nice genre :)',
          image_url: artists.items[0].images[0].url,
          list: tracks
        });
      });
    });
  }


  fetchMyRecentTopTracks() {
    this.api('/me/player/recently-played?limit=50').pipe(map((res: TopTracks) => {
      const list: Track[] = [];
      const tracksNames = [];
      res.items.forEach(track => {
        list.push(track.track);
        tracksNames.push(track.track.name);
      });
      const topTrackName = this.topElementInArray(tracksNames);
      const img = list.filter(track => track.name === topTrackName)[0].album.images[0].url;
      return new AppDataObject(
        CONSTS.RECENT,
        CONSTS.TRACK,
        img,
        topTrackName,
        'test',
        list
      );

    })).subscribe((res: AppDataObject) => {
      this.appData.next(res);
    });
  }

  fetchMyRecentTopArtist() {
    this.api('/me/player/recently-played?limit=50').subscribe((res: TopTracks) => {
      const artistsIds = [];
      res.items.forEach(track => {
        artistsIds.push(track.track.artists[0].id);
      });
      this.api('/artists?ids=' + [...new Set(artistsIds)].join(','))
        // this.api('/artists?ids=' + [...new Set(artistsIds)].join(','))
        .pipe(map((al: any) => al.artists)) // the api return 'artists: {artists: Artist[]}' convert to artists: Artist[]
        .subscribe((artists: Artist[]) => {
          const topArtistId = this.topElementInArray(artistsIds);
          const topArtist: Artist = artists.find(artist => artist.id === topArtistId);
          this.appData.next(new AppDataObject(
            CONSTS.RECENT,
            CONSTS.ARTIST,
            topArtist.images[0].url,
            topArtist.name,
            topArtist.followers.total.toString(),
            artists
          ));
        });
    });

  }

  private topElementInArray(array: string[]): string {
    const modeMap = {};
    let maxEl = array[0];
    let maxCount = 1;
    array.forEach(id => {
      if (!modeMap[id]) {
        modeMap[id] = 1;
      } else {
        modeMap[id]++;
      }
      if (modeMap[id] > maxCount) {
        maxEl = id;
        maxCount = modeMap[id];
      }
    });
    // console.log(modeMap);
    return maxEl;
  }

  private api(endpoint: string) {
    if (!this.token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.token = userData._token;
    }
    return this.http.get(environment.API_URL + endpoint, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token
      })
    });

  }

}
