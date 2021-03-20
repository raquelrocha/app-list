import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppItemComponent } from './app-item/app-item.component';
import { AppListComponent } from './app-list.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AppItemComponent,
    AppListComponent,
    SearchComponent,
    CategoriesComponent
  ],
  exports: [
    AppListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppListModule { }
