import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';

import {environment} from 'src/environments/environment';
import {TopTracks, Track, TopArtists, Album, Artist } from '../models/spotify.model';
import { AppData, AppDataObject, CONSTS } from '../models/appData.model';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  appData = new Subject<AppData>();
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
          case CONSTS.ALBUM:
            this.fetchMyRecentTopAlbum();
            break;
          case CONSTS.GENRE:
            this.fetchMyRecentTopGenre();
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
      const artistsIds = [];
      artists.items.forEach(artist => {
        artist.genres.forEach(genre => genres.push(genre));
        artistsIds.push(artist.id);
      });
      const topArtist = this.topElementInArray(artistsIds);
      const topGenre = this.topElementInArray(genres);
      this.api('/recommendations?seed_genres=' + topGenre + ',' + genres.find(genre => genre !== topGenre) + ',seed_artists=' + topArtist)
      .pipe( map( (res: any) => res.tracks))
      .subscribe( (tracks: Track[]) => {
        this.appData.next({
          result: topGenre,
          description: '',
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
        .pipe(map((al: any) => al.artists)) // the api return 'artists: {artists: Artist[]}' convert to artists: Artist[]
        .subscribe((artists: Artist[]) => {
          const topArtistId = this.topElementInArray(artistsIds);
          const topArtist: Artist = artists.find(artist => artist.id === topArtistId);
          this.appData.next(new AppDataObject(
            topArtist.images[0].url,
            topArtist.name,
            topArtist.followers.total.toString(),
            artists
          ));
        });
    });

  }

  fetchMyRecentTopAlbum() {
    this.api('/me/player/recently-played?limit=20').subscribe((res: TopTracks) => {
      const albumsIds = [];
      res.items.forEach(track => {
        albumsIds.push(track.track.album.id);
      });
      this.api('/albums?ids=' + [...new Set(albumsIds)].join(','))
        .pipe(map((al: any) => al.albums)) // the api return 'artists: {artists: Artist[]}' convert to artists: Artist[]
        .subscribe((albums: Album[]) => {
          const topAlbumId = this.topElementInArray(albumsIds);
          const topAlbum: Album = albums.find(album => album.id === topAlbumId);
          this.appData.next(new AppDataObject(
            topAlbum.images[0].url,
            topAlbum.name,
            topAlbum.artists[0].name,
            topAlbum.tracks.items
          ));
        });
    });
  }

  fetchMyRecentTopGenre() {
    this.api('/me/player/recently-played?limit=50').subscribe((res: TopTracks) => {
      const artistsIds = [];
      res.items.forEach(track => {
        artistsIds.push(track.track.artists[0].id);
      });
      const topArtistId = this.topElementInArray(artistsIds);
      this.api('/artists/' + topArtistId ).subscribe( (artist: Artist) => {
        this.api('/recommendations?seed_genres=' + artist.genres[0] + '&seed_artists=' + topArtistId)
        .pipe(map((al: any) => al.tracks)) // the api return 'artists: {artists: Artist[]}' convert to artists: Artist[]
        .subscribe((tracks: Track[]) => {
          this.appData.next({
            result: artist.genres[0],
            description: '',
            image_url: artist.images[0].url,
            list: tracks
          });
        });
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
    return this.http.get(environment.API_URL + endpoint);
  }

}
