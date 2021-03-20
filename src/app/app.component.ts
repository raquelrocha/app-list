import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private appsUrl = 'assets/apps.json';

  constructor(
    private readonly http: HttpClient,
    private readonly appService: AppService
  ) {
    this.getJSON().subscribe((data) => {
      this.appService.createAppList(data);
    });
  }

  private getJSON(): Observable<any> {
    return this.http.get(this.appsUrl);
  }
}
