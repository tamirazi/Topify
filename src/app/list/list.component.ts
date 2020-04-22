import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tracks = [0,0,0,0,0,0,0,0,0,0]
  constructor() { }

  ngOnInit(): void {
  }

}
