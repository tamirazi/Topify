
import { clientId } from './env';

export const environment = {
  production: true,
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
