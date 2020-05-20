import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Track, Artist, Album } from '../../../models/spotify.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() list: Track[];
  @Input() imageUrlToAllListItem: string = null;
  @Input() type: string;
  @Input() time: string;
  
  @Output() savePlaylistEmitter = new EventEmitter();

  totalDuration = 0;
  isPlaying = false;

  constructor() {}
  ngOnChanges(changes): void {
    this.totalDuration = 0;
    
    this.list.forEach( (element: any) => {
      this.totalDuration += element.duration_ms;
    });
    
  }

  ngOnInit(): void {
    console.log('list oninit');

  }

  savePlayList() {
    this.savePlaylistEmitter.emit('new Playlist');
  }



}
