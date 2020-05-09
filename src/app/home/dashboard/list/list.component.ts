import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Track, Artist, Album } from '../../../models/spotify.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() list: Track[] | Artist[];
  @Input() imageUrlToAllListItem: string = null;
  @Input() type: string;
  @Output() savePlaylistEmitter = new EventEmitter();

  totalDuration = 0;

  constructor() {}
  ngOnChanges(changes): void {
    this.totalDuration = 0;
    if ( this.type === 'track' || this.type === 'genre' || this.type === 'album') {
      this.list.forEach( (element: any) => {
        this.totalDuration += element.duration_ms;
      });
    }
  }

  ngOnInit(): void {
    console.log('list oninit');

  }

  savePlayList() {
    this.savePlaylistEmitter.emit('new Playlist');
  }

}
