import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';

import { AppItemComponent } from './app-item/app-item.component';
import { AppListComponent } from './app-list.component';
import { AppService } from '../app.service';

describe('AppListComponent', () => {
  let component: AppListComponent;
  let fixture: ComponentFixture<AppListComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    const spyGetList = jasmine.createSpyObj('AppService', ['getAppList']);

    TestBed.configureTestingModule({
      declarations: [
        AppListComponent,
        MockComponent(AppItemComponent)
      ],
      providers: [{ provides: AppService, useValue: spyGetList }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppListComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
  });

  it('should create', fakeAsync(() => {
    spyOn(appService, 'getAppList').and.returnValue(
      new BehaviorSubject([
        {
          name: 'App1',
          categories: ['Cat1'],
        },
      ])
    );

    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
    expect(component.pages).toEqual({
      total: 1,
      current: 0,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual(component.apps);
  }));

  it('should paginate the app list', fakeAsync(() => {
    spyOn(appService, 'getAppList').and.returnValue(
      new BehaviorSubject([
        {
          name: 'App1',
          categories: ['Cat1'],
        },

        {
          name: 'App2',
          categories: ['Cat1'],
        },

        {
          name: 'App3',
          categories: ['Cat1'],
        },

        {
          name: 'App4',
          categories: ['Cat1'],
        },
      ])
    );

    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
    expect(component.pages).toEqual({
      total: 2,
      current: 0,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual([...component.apps].splice(0, 3));
  }));

  it('should change the page showing the apps', fakeAsync(() => {
    spyOn(appService, 'getAppList').and.returnValue(
      new BehaviorSubject([
        {
          name: 'App1',
          categories: ['Cat1'],
        },

        {
          name: 'App2',
          categories: ['Cat1'],
        },

        {
          name: 'App3',
          categories: ['Cat1'],
        },

        {
          name: 'App4',
          categories: ['Cat1'],
        },
      ])
    );

    fixture.detectChanges();
    tick();
    expect(component.pages).toEqual({
      total: 2,
      current: 0,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual([...component.apps].splice(0, 3));

    component.changePage(1);
    expect(component.pages).toEqual({
      total: 2,
      current: 1,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual([...component.apps].splice(3, 3));

    component.changePage('-');
    expect(component.pages).toEqual({
      total: 2,
      current: 0,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual([...component.apps].splice(0, 3));

    component.changePage('+');
    expect(component.pages).toEqual({
      total: 2,
      current: 1,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual([...component.apps].splice(3, 3));

    component.changePage('do nothing');
    expect(component.pages).toEqual({
      total: 2,
      current: 1,
      contentPerPage: 3,
    });
    expect(component.appsToShow).toEqual([...component.apps].splice(3, 3));
  }));
});
