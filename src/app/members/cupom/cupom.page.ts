import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/service/cupom.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.page.html',
  styleUrls: ['./cupom.page.scss'],
})
export class CupomPage implements OnInit {

  constructor(private cupomService: CupomService, private activRouter: ActivatedRoute) { }
  qrcode
  cupomId;
  ngOnInit() {
    this.cupomId = this.activRouter.snapshot.paramMap.get('id');
    this.qrcode = this.cupomService.getUserCupomId(this.cupomId)
  }

}
