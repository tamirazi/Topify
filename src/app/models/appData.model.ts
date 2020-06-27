import { Track } from '../models/spotify.model';
export const CONSTS = {
  ARTIST: 'artist',
  TRACK: 'track',
  ALBUM: 'album',
  GENRE: 'genre',
  TOP: 'top',
  RECENT: 'recent',
};

export interface AppData {
  image_url: string;
  result: string;
  description: string | number;
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
