import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-nav',
  templateUrl: './time-nav.component.html',
  styleUrls: ['./time-nav.component.scss'],
})
export class TimeNavComponent implements OnInit {
  time: string;
  type: string;
  constructor(private activadetRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activadetRoute.params.subscribe((res: any) => {
      this.type = res.type;
      this.time = res.time;
    });
  }
}
