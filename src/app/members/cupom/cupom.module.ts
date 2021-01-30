import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CupomPage } from './cupom.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

const routes: Routes = [
  {
    path: '',
    component: CupomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CupomPage]
})
export class CupomPageModule {}
