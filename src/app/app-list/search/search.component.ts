import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'td-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  listToSearch: any[];

  @Output()
  results: EventEmitter<any[]> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  search(event): void {
    this.results.emit(
      this.listToSearch.filter((app) => {
        return app.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      })
    );
  }
}
