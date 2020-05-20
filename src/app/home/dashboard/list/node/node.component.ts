import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/spotify.model';
import { MediaPlayerService } from 'src/app/services/media-player.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input() track: Track;
  @Input() index: number;

  isPlaying = false;
  isPreview = true;

  constructor(private player: MediaPlayerService) { }

  ngOnInit(): void {
    this.player.stopAllNodes.subscribe( res => this.isPlaying = false);
  }

  preview(url) {
    if (!url) {
      this.isPreview = false;
      setTimeout( () => this.isPreview = true, 3000);
    }else {
      this.player.play(url);
      this.isPlaying = true;
    }
  }

  stop() {
    this.player.stop();
    this.isPlaying = false;
  }

}
