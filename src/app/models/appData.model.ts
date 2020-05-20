import { Track, Artist } from '../models/spotify.model';
export const CONSTS = {
  ARTIST: 'artist',
  TRACK: 'track',
  ALBUM: 'album',
  GENRE: 'genre',
  TOP: 'top',
  RECENT: 'recent',
};

export interface AppData {
  // time: string;
  // type: string;
  image_url: string;
  result: string;
  description: string;
  list: Track[];
}
export class AppDataObject implements AppData {
  constructor(
    // tslint:disable-next-line:variable-name
    public image_url: string,
    public result: string,
    public description: string,
    public list: Track[]
  ) {}
}
