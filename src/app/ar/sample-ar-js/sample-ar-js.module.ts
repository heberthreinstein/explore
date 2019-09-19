import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SampleArJsPage } from './sample-ar-js.page';

const routes: Routes = [
  {
    path: '',
    component: SampleArJsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SampleArJsPage]
})
export class SampleArJsPageModule {}
