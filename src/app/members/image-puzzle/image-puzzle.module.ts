import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImagePuzzlePage } from './image-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: ImagePuzzlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImagePuzzlePage]
})
export class ImagePuzzlePageModule {}
