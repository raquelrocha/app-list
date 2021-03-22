import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MockComponents, MockProvider } from 'ng-mocks';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppListComponent } from './app-list/app-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { SearchComponent } from './search/search.component';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ...MockComponents(
          AppListComponent,
          CategoriesComponent,
          SearchComponent
        ),
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MockProvider(AppService)
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it('should create the app and retrieve the json file', () => {
    const appService = TestBed.inject(AppService);
    const spyApp = spyOn(appService, 'createAppList').and.callFake(() =>
      of({})
    );
    expect(app).toBeTruthy();

    const apps = [
      { name: 'a', categories: ['Optimization'] },
      { name: 'b', categories: ['Channel'] },
    ];
    const req = httpMock.expectOne('assets/apps.json');
    expect(req.request.method).toEqual('GET');
    req.flush(apps);
    expect(spyApp).toHaveBeenCalledWith(apps);
    expect(app.categories).toEqual(new Set(['Channel', 'Optimization']));
  });
});
