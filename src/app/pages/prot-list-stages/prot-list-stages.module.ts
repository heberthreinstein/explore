import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProtListStagesPage } from './prot-list-stages.page';

const routes: Routes = [
  {
    path: '',
    component: ProtListStagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProtListStagesPage]
})
export class ProtListStagesPageModule {}
