import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProtDatePuzzlePage } from './prot-date-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: ProtDatePuzzlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProtDatePuzzlePage]
})
export class ProtDatePuzzlePageModule {}
