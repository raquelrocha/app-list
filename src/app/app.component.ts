import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apps: any;

  private appsUrl = 'assets/apps.json';

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.apps = data;
    });
  }

  private getJSON(): Observable<any> {
    return this.http.get(this.appsUrl);
  }
}
