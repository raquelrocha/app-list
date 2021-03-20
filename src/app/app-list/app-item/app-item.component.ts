import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'td-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss'],
})
export class AppItemComponent implements OnInit {
  @Input()
  app: any;

  constructor() {}

  ngOnInit(): void {}
}
