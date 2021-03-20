import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'td-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Set<String>;

  @Output()
  selectCategory: EventEmitter<String> = new EventEmitter();

  selectedCat = '';
  constructor() {}

  ngOnInit(): void {}

  filterBy(category: string) {
    this.selectCategory.emit(category);
    this.selectedCat = category;
  }
}
