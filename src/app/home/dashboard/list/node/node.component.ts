import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/spotify.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input() track: Track;
  @Input() index: number;
  audio;

  isPlaying = false;

  constructor() { }

  ngOnInit(): void {
  }

  preview(url) {
    this.audio = new Audio(url);
    this.audio.play();
    this.isPlaying = true;

  }

  stop() {
    this.audio.pause();
    this.isPlaying = false;
  }

}
