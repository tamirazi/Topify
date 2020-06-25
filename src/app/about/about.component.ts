import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isUser = false;
  @Input() option: string;
  @Output() onCloseEmmiter = new EventEmitter();

  constructor(private location: Location) {}

  ngOnInit(): void {
    console.log(this.option);
  }

  close() {
    this.onCloseEmmiter.emit();
  }
}
