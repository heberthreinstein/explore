import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListImagePuzzlePage } from './list-image-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: ListImagePuzzlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListImagePuzzlePage]
})
export class ListImagePuzzlePageModule {}
