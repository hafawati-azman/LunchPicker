import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchRestaurantResultPage } from './search-restaurant-result.page';

const routes: Routes = [
  {
    path: '',
    component: SearchRestaurantResultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchRestaurantResultPage]
})
export class SearchRestaurantResultPageModule {}
