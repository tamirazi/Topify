import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-nav',
  templateUrl: './type-nav.component.html',
  styleUrls: ['./type-nav.component.scss'],
})
export class TypeNavComponent implements OnInit {
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
