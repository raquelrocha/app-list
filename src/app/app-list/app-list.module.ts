import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppItemComponent } from './app-item/app-item.component';
import { AppListComponent } from './app-list.component';

@NgModule({
  declarations: [
    AppItemComponent,
    AppListComponent
  ],
  exports: [
    AppListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppListModule { }
