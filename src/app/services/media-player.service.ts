import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaPlayerService {
  audio: any;
  stopAllNodes = new Subject();
  constructor() { }

  play(url: string) {
    if (this.audio && !this.audio.paused) {
      this.stop();
    }
    if (url) {
      this.audio = new Audio(url);
      this.audio.play();
    }


  }

  stop() {
    this.stopAllNodes.next();
    this.audio.pause();
  }
}
