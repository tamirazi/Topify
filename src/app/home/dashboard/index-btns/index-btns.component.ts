import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

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
export class IndexBtnsComponent implements OnInit, OnChanges {
  @Output() indexChanged = new EventEmitter<number>();
  @Input() index: number;

  first_colors = ['#f5d976', '#12cad6', '#f6bed6'];
  second_colors = ['#f3cf54', '#0fabbc', '#e79cc2'];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    document.documentElement.style.setProperty(
      '--first-color',
      this.first_colors[this.index]
    );
    document.documentElement.style.setProperty(
      '--second-color',
      this.second_colors[this.index]
    );
  }
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
