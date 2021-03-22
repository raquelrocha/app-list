import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { SearchComponent } from './search.component';
import { AppService } from '../app.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [MockProvider(AppService)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    appService = TestBed.inject(AppService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by name', () => {
    const spyAppService = spyOn(appService, 'filterAppsByName').and.stub();
    expect(component.showClearBtn).toEqual(false);

    component.search({
      target: {
        value: 'Search Value'
      }
    });

    expect(component.showClearBtn).toEqual(true);
    expect(spyAppService).toHaveBeenCalledWith('Search Value');
  });

  it('should clear the search', () => {
    const spyAppService = spyOn(appService, 'filterAppsByName').and.stub();
    expect(component.showClearBtn).toEqual(false);

    const input = {
      target: {
        value: 'Name',
      },
    };
    component.search(input);
    expect(component.showClearBtn).toEqual(true);
    expect(spyAppService).toHaveBeenCalledWith('Name');
    component.clearSearchInput();

    expect(component.showClearBtn).toEqual(false);
    expect(spyAppService).toHaveBeenCalledWith('');
  });
});
