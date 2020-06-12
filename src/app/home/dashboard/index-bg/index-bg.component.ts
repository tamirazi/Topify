import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-index-bg',
  templateUrl: './index-bg.component.html',
  styleUrls: ['./index-bg.component.scss'],
})
export class IndexBgComponent implements OnInit {
  @Input() index: number;
  constructor() {}

  ngOnInit(): void {}
}
