import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-index-bg',
  templateUrl: './index-bg.component.html',
  styleUrls: ['./index-bg.component.scss'],
})
export class IndexBgComponent implements OnChanges {
  @Input() index: number;
  pulsing = false;
  constructor() {}

  ngOnChanges(changes): void {
    this.pulsing = true;
  }
}
