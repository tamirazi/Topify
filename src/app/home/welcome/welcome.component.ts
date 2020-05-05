import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @Input() username: string;
  @Input() image: string;
  @Input() time: string;
  constructor() { }

  ngOnInit(): void {
  }

}
