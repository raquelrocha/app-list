import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'td-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnChanges {
  @Input()
  list: any[];

  apps: any[];

  appsToShow: any[];
  pages = {
    total: 0,
    current: 0,
    contentPerPage: 3
  };

  counter = Array;
  constructor() {}

  ngOnChanges(): void {
    if (!!this.list) {
      this.apps = [...this.list];
      this.pages.total = Math.ceil(this.apps.length / 3);
      this.changePage(0);
    }
  }

  changePage(change): void {
    this.sortAppsBySubsTotalPrice();
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

  getSearchResults(event): void {
    this.apps = [...event];
    this.pages.total = Math.ceil(this.apps.length / 3);
    this.changePage(0);
  }

  private getLength() {
    return this.apps.length >= 3 ? this.apps.length / 3 : 3;
  }

  private sortAppsBySubsTotalPrice() {
    this.apps = this.apps.sort((app1, app2) => {
      if (this.getSubsTotal(app1) < this.getSubsTotal(app2)) {
        return -1;
      } else return 1;
    });
  }

  private getSubsTotal(app): number {
    return app.subscriptions
      .map((subs) => subs.price)
      .reduce((acc, current) => acc + current);
  }
}
