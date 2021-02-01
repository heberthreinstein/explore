import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/service/cupom.service';
import { ActivatedRoute } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.page.html',
  styleUrls: ['./cupom.page.scss'],
})
export class CupomPage implements OnInit {
  title: any;
  information: any;
  discount: any;
  store: any;

  constructor(private cupomService: CupomService, private activRouter: ActivatedRoute) { }
  qrcode 
  elementType = NgxQrcodeElementTypes.URL
  cupomId;
  cupom: any;
  ngOnInit() {
    this.cupomId = this.activRouter.snapshot.paramMap.get('id');
    this.cupomService.getUserCupomId(this.cupomId).subscribe((res: any) => {
        this.qrcode = res[0].payload.doc.id
    })
    this.cupomService.getCupomByDocId(this.cupomId).subscribe(res => {
        this.title = res.data().title.toString()
        this.information = res.data().information.toString()
        this.discount = res.data().discount.toString()
        this.store = res.data().store.toString()
    })
     
  }


}
