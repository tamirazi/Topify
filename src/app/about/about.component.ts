import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isUser = false;
  @Input() option: string;
  @Input() userImgUrl: string;
  @Output() onCloseEmmiter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.option);
  }

  close() {
    this.onCloseEmmiter.emit();
  }
}
