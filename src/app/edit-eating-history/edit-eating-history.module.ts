import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule} from '@angular/forms';

import { EditEatingHistoryPage } from './edit-eating-history.page';

const routes: Routes = [
  {
    path: '',
    component: EditEatingHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [EditEatingHistoryPage]
})
export class EditEatingHistoryPageModule {}
