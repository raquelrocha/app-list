import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'td-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  apps: any[];

  appsToShow: any[];
  pages = {
    total: 0,
    current: 0,
    contentPerPage: 3,
  };


  counter = Array;
  constructor(private readonly appService: AppService) {}

  ngOnInit() {
    this.appService.getAppList().subscribe((list) => {
      this.apps = list;
      this.pages.total = Math.ceil(this.apps.length / 3);
      this.changePage(0);
    });
  }

  changePage(change): void {
    if (typeof change === 'number') {
      this.pages.current = change;
      this.appsToShow = [...this.apps].splice(
        this.pages.contentPerPage * change,
        this.pages.contentPerPage
      );
    } else if (change === '+' && this.pages.current < this.pages.total - 1) {
      this.changePage(this.pages.current + 1);
    } else if (change === '-' && this.pages.current > 0) {
      this.changePage(this.pages.current - 1);
    }
  }
}
