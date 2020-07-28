import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPuzzlePage } from './edit-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: EditPuzzlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPuzzlePage]
})
export class EditPuzzlePageModule {}
