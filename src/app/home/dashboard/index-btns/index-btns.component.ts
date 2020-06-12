import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-index-btns',
  template: `
    <div class="index-buttons">
      <div class="down" (click)="downIndex()">&#9664;</div>
      <div class="up" (click)="upIndex()">&#9654;</div>
    </div>
  `,
  styleUrls: ['./index-btns.component.scss'],
})
export class IndexBtnsComponent implements OnInit {
  @Output() indexChanged = new EventEmitter<number>();
  @Input() index: number;
  constructor() {}

  ngOnInit(): void {}

  downIndex() {
    if (this.index > 0) {
      this.indexChanged.emit(-1);
    }
  }
  upIndex() {
    if (this.index < 2) {
      this.indexChanged.emit(1);
    }
  }
}
