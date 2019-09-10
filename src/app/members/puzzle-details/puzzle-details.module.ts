import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PuzzleDetailsPage } from './puzzle-details.page';

const routes: Routes = [
  {
    path: '',
    component: PuzzleDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PuzzleDetailsPage]
})
export class PuzzleDetailsPageModule {}
