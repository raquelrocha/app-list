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

  categories = new Set();

  counter = Array;
  constructor() {}

  ngOnChanges(): void {
    if (!!this.list) {
      this.apps = [...this.list];
      this.pages.total = Math.ceil(this.apps.length / 3);
      this.changePage(0);
      this.getCategories();
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

  getCatResults(event): void {
    this.apps = [...this.list].filter((app) => {
      return app.categories.indexOf(event) > -1;
    })
    this.pages.total = Math.ceil(this.apps.length / 3);
    this.changePage(0);
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

  private getCategories() {
    this.apps.forEach(app => app.categories.forEach(cat => this.categories.add(cat)));
  }
}
