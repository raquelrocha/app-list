import { Component, Input, OnInit } from '@angular/core';

import { AppService } from '../../app/app.service';

@Component({
  selector: 'td-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Set<string>;

  selectedCat = '';
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {}

  filterBy(category: string) {
    if (this.selectedCat === category) {
      this.selectedCat = '';
    } else {
      this.selectedCat = category;
    }

    this.appService.filterAppsByCategory(this.selectedCat);
  }
}
