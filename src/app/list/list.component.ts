import { Component, OnInit, Input } from '@angular/core';
import { Track, Artist, Album } from '../models/spotify.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input() list: Track[] | Artist[];
  @Input() imageUrlToAllListItem: string = null;
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {
  }

}
