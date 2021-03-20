import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'td-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  showClearBtn = false;
  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {}

  search(event): void {
    this.showClearBtn = true;
    this.appService.filterAppsByName(event.target.value);
  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = '';
    this.search({ target: { value: '' } });
    this.showClearBtn = false;
  }
}
