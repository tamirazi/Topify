import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject, forkJoin} from 'rxjs';

import {environment} from 'src/environments/environment';
import {TopTracks, Track, TopArtists, Album, Artist, ArtistTopTracks, SpotifyError } from '../models/spotify.model';
import { AppData, AppDataObject, CONSTS } from '../models/appData.model';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  appData = new Subject<AppData>();
  error = new Subject<SpotifyError>();
  playlistCreated = new Subject<any>();
  constructor(private http: HttpClient) { }

  fetch(time: string, type: string, index: number) {
    switch (time) {
      case CONSTS.TOP:
        switch (type) {
          case CONSTS.ARTIST:
            this.getMyTopArtist(index);
            break;
          case CONSTS.TRACK:
            this.getMyTopTrack(index);
            break;
          case CONSTS.ALBUM:
            this.getMyTopAlbum(index);
            break;
          case CONSTS.GENRE:
            this.getMyTopGenre(index);
            break;
        }
        break;
      case CONSTS.RECENT:
        switch (type) {
          case CONSTS.ARTIST:
            this.getMyRecentTopArtist(index);
            break;
          case CONSTS.TRACK:
            this.getMyRecentTopTracks(index);
            break;
          case CONSTS.ALBUM:
            this.getMyRecentTopAlbum(index);
            break;
          case CONSTS.GENRE:
            this.getMyRecentTopGenre(index);
            break;
        }
        break;

      default:

    }
  }

  getUsername() {
    return this.api('/me');
  }

  getPlaylist(artistId?: string[], trackId?: string[],  genre?: string[]){
    return this.api('/recommendations?limit=20&seed_genres=' + genre.join(',')
    + '&seed_artists=' + artistId.join(',') + '&seed_tracks=' + trackId.join(','));
  }

  private getMyTopTrack(index: number) {
    this.api('/me/top/tracks?limit=3&time_range=long_term').subscribe((res: TopTracks) => {
      this.getPlaylist([res.items[index].artists[0].id], [res.items[index].id], [])
      .subscribe( (recomendations: any) => {
        this.appData.next({
          result: res.items[index].name,
          description: res.items[index].artists[0].name,
          image_url: res.items[index].album.images[0].url,
          list: recomendations.tracks,
        });
      });
    }, err => {
      this.error.next(err);
    });
  }

  private getMyTopArtist(index: number) {
    this.api('/me/top/artists?limit=3&time_range=long_term').subscribe((res: TopArtists) => {
      this.getPlaylist([res.items[index].id], [], res.items[0].genres.slice(0, 3))
      .subscribe( (recomendations: any) => {
        this.appData.next({
          result: res.items[index].name,
          description: res.items[index].genres[0],
          image_url: res.items[index].images[0].url,
          list: recomendations.tracks,
        });
      });
    }, err => {
      this.error.next(err);
    });
  }

  private getMyTopAlbum(index: number) {
    this.api('/me/top/tracks?limit=50&time_range=long_term').subscribe((tracks: TopTracks) => {
      const albumsIds = [];
      tracks.items.forEach(track => {
        albumsIds.push(track.album.id);
      });
      const topThreeAlbums = this.getTopThreeFromArray(albumsIds);
      this.api('/albums/' + topThreeAlbums[index][0]).subscribe((res: Album) => {
        this.appData.next({
          result: res.name,
          description: res.artists[0].name,
          image_url: res.images[0].url,
          list: res.tracks.items,
        });
      });
    }, err => {
      this.error.next(err);
    });
  }

  private getMyTopGenre(index: number) {
    this.api('/me/top/artists?limit=50&time_range=long_term').subscribe((artists: TopArtists) => {
      const genres = [];
      artists.items.forEach(artist => {
        artist.genres.forEach(genre => genres.push(genre));
      });
      const topThreeGenre = this.getTopThreeFromArray(genres);
      const topArtist = artists.items.find( artist => artist.genres[0] === topThreeGenre[index][0]);
      this.getPlaylist([artists.items[0].id], [], [topThreeGenre[index][0]])
      .subscribe( (recomendations: any) => {
        this.appData.next({
          result: topThreeGenre[index][0],
          description: '',
          image_url: topArtist.images[0].url,
          list: recomendations.tracks,
        });
      });

    }, err => {
      this.error.next(err);
    });
  }

  private getMyRecentTopTracks(index: number) {
    this.api('/me/player/recently-played?limit=50').subscribe( (res: TopTracks) => {
      const tracksId = [];
      res.items.forEach(track => {
        tracksId.push(track.track.id);
      });
      const topRecentTracksIds = this.getTopThreeFromArray(tracksId);
      const topTrack = res.items.find( track => track.track.id === topRecentTracksIds[index][0]);

      this.getPlaylist([topTrack.track.artists[0].id], [topRecentTracksIds[index][0]], [])
      .subscribe((recomendations: any) => {
        this.appData.next({
          result: topTrack.track.name,
          description: topTrack.track.artists[0].name,
          image_url: topTrack.track.album.images[0].url,
          list: recomendations.tracks
        });
      });
    });
  }

  private getMyRecentTopArtist(index: number) {
    this.api('/me/player/recently-played?limit=50').subscribe( (res: TopTracks) => {
      const artistsIds = [];
      res.items.forEach(track => {
        artistsIds.push(track.track.artists[0].id);
      });
      const topRecentArtistIds = this.getTopThreeFromArray(artistsIds);
      const topTrack = res.items.find( track => track.track.artists[0].id === topRecentArtistIds[index][0]);

      this.getPlaylist([topTrack.track.artists[0].id], [topTrack.track.id], [])
      .subscribe((recomendations: any) => {
        this.appData.next({
          result: topTrack.track.artists[0].name,
          description: '',
          image_url: topTrack.track.album.images[0].url,
          list: recomendations.tracks
        });
      });
    });

  }

  private getMyRecentTopAlbum(index: number) {
    this.api('/me/player/recently-played?limit=50').subscribe( (res: TopTracks) => {
      const albumsIds = [];
      res.items.forEach(track => {
        albumsIds.push(track.track.album.id);
      });
      const topRecentAlbumsIds = this.getTopThreeFromArray(albumsIds);
      this.api('/albums?ids=' + topRecentAlbumsIds[index][0])
        .pipe(map((al: any) => al.albums))
        .subscribe((albums: Album[]) => {
          const topAlbum: Album = albums.find(album => album.id === topRecentAlbumsIds[index][0]);
          this.appData.next(new AppDataObject(
            topAlbum.images[0].url,
            topAlbum.name,
            topAlbum.artists[0].name,
            topAlbum.tracks.items
          ));
        });
    });

  }

  private getMyRecentTopGenre(index: number) {
    this.api('/me/player/recently-played?limit=50').subscribe( (res: TopTracks) => {
      const artistsIds = [];
      res.items.forEach(track => {
        artistsIds.push(track.track.artists[0].id);
      });
      const topRecentArtistIds = this.getTopThreeFromArray(artistsIds);
      this.api('/artists/' + topRecentArtistIds[index][0] ).subscribe( (artist: Artist) => {
        this.getPlaylist([artist.id], [] , artist.genres.slice(0, 3))
        .subscribe((recomendations: any) => {
          this.appData.next({
            result: artist.genres[0],
            description: '',
            image_url: artist.images[0].url,
            list: recomendations.tracks
          });
        });
      });
    });

  }

  private api(endpoint: string) {
    return this.http.get(environment.API_URL + endpoint);
  }

  private getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayStr = mm + '/' + dd + '/' + yyyy;
    return todayStr;
  }

  private getTopThreeFromArray(arr) {
    const myMap = new Map();
    arr.forEach(elm => {
      myMap.has(elm) ? myMap.set(elm, myMap.get(elm) + 1) : myMap.set(elm , 1);
    });

    return Array.from(myMap).sort( (a , b) =>  b[1] - a[1]).slice(0, 3);
  }

  createPlaylistFromTracks(userId: string, playListName: string, tracks: Track[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    const description = `Created by Topify on ${this.getTodayDate()}`;
    const body = {
      name: playListName,
      description
    };
    this.http.post( environment.API_URL + '/users/' + userId + '/playlists', body , httpOptions)
    .subscribe( (res: any) => {
      const uris = [];
      tracks.forEach(track => {
        uris.push(track.uri);
      });
      const addTracksBody = {
        uris
      };
      this.http.post( res.tracks.href, addTracksBody, httpOptions).subscribe( (playlist: any) => {
        this.playlistCreated.next(res);
      });
    }, err => {
      this.error.next(err);
    });
  }


}
