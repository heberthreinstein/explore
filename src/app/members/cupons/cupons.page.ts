import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/service/cupom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.page.html',
  styleUrls: ['./cupons.page.scss'],
})
export class CuponsPage implements OnInit {
  
    cupons;

  constructor(private cupomService: CupomService, private router: Router) { }

  ngOnInit() {
      this.cupomService.getLoggedUserCupons().subscribe( (res: any) => {
        console.log(res)
        this.cupons = res
        res.forEach(element => {
            this.cupomService.getCupomByDocId(element.cupomId).subscribe((res: any) => {
                element.title = res.title;
                element.store = res.store;
                element.discount = res.discount;
                element.information = res.information;
            });
        });
    });
  }

  goToCupom(id){
      this.router.navigate(['members/cupom',id])
  }

}
