import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/service/cupom.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-cupom',
    templateUrl: './edit-cupom.page.html',
    styleUrls: ['./edit-cupom.page.scss'],
})
export class EditCupomPage implements OnInit {

    title;
    store;
    discount;
    information;
    urlParam;

    constructor(private cupomService: CupomService, private activRouter: ActivatedRoute) { }

    ngOnInit() {
    this.urlParam = this.activRouter.snapshot.paramMap.get('cupom');

    }

    save() {
        if (this.urlParam === 'new') {
            this.cupomService.newCupom(this.title,this.store,this.discount,this.information);
        } else {
            this.cupomService.updateCupom(this.title,this.store,this.discount,this.information);

        }
    }

}
