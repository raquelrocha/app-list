import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { CategoriesComponent } from './categories.component';
import { AppService } from '../../app.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        MockProvider(AppService)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by category', () => {
    const appService = TestBed.inject(AppService);
    const spyAppService = spyOn(appService, 'filterAppsByCategory').and.stub();
    expect(component.selectedCat).toBe('');

    const cat = 'Virtual';
    component.filterBy(cat);

    expect(spyAppService).toHaveBeenCalledWith(cat);
    expect(component.selectedCat).toBe(cat);

    component.filterBy(cat);

    expect(spyAppService).toHaveBeenCalledWith('');
    expect(component.selectedCat).toBe('');
  });
});
