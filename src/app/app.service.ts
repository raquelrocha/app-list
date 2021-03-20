import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  appList: BehaviorSubject<any[]>;

  private initialList: any[];

  private categoryFilter: string;
  private nameFilter: string;

  constructor() {
    this.appList = new BehaviorSubject([]);
  }

  createAppList(list: any[]) {
    if (!this.initialList) {
      this.initialList = [...list];
    }
    this.appList.next(this.sortAppsBySubsTotalPrice([...list]));
  }

  getAppList() {
    return this.sortAppsBySubsTotalPrice(this.appList);
  }

  filterAppsByCategory(category, list?: any[]) {
    let listToFilter = !!list ? list : [...this.initialList];
    this.categoryFilter = undefined;
    if (!!this.nameFilter) {
      this.filterAppsByName(this.nameFilter, [...this.initialList]);
      listToFilter = [...this.appList.getValue()];
    }
    this.createAppList(
      this.sortAppsBySubsTotalPrice(
        listToFilter.filter((app) => {
          return !!category ? app.categories.indexOf(category) > -1 : true;
        })
      )
    );
    this.categoryFilter = !!category ? category : undefined;
  }

  filterAppsByName(name, list?: any[]) {
    let listToFilter = !!list ? list : [...this.initialList];
    this.nameFilter = undefined;
    if (!!this.categoryFilter) {
      this.filterAppsByCategory(this.categoryFilter, [...this.initialList]);
      listToFilter = [...this.appList.getValue()];
    }
    this.createAppList(
      this.sortAppsBySubsTotalPrice(
        listToFilter.filter((app) => {
          return app.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })
      )
    );
    this.nameFilter = !!name ? name : undefined;
  }

  private sortAppsBySubsTotalPrice(apps) {
    return [...apps].sort((app1, app2) => {
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
