// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { clientId } from '../environments/env';

export const environment = {
  production: false,
  API_URL: 'https://api.spotify.com/v1',
  SPOTIFY_AUTHORIZE_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_AUTH_SCOPES: 'user-read-recently-played user-top-read playlist-modify-public user-read-private user-read-email',
  SPOTIFY_CLIENT_ID: clientId.SPOTIFY_CLIENT_ID,
  CALLBACK_URL: `${window.location.origin}/login`,
};

export const authUrl = {
  url : environment.SPOTIFY_AUTHORIZE_URL + '?' +
  'client_id=' + environment.SPOTIFY_CLIENT_ID +
  '&response_type=token' +
  '&redirect_uri=' + environment.CALLBACK_URL +
  '&scope=' + environment.SPOTIFY_AUTH_SCOPES
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
