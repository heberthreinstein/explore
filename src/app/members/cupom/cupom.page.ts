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

  constructor(private cupomService: CupomService, private activRouter: ActivatedRoute) { }
  qrcode 
  elementType = NgxQrcodeElementTypes.URL
  cupomId;
  cupom= new Array()
  ngOnInit() {
    this.cupomId = this.activRouter.snapshot.paramMap.get('id');
    this.cupomService.getUserCupomId(this.cupomId).subscribe((res: any) => {
        this.qrcode = res[0].payload.doc.id + '#' + res[0].payload.doc.data().uid;
    })
     this.cupomService.getCupomByDocId(this.cupomId).subscribe((res: any) => {
        this.cupom.push(res);
    })
    console.log(this.cupom)
  }


}
