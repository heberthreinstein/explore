import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/service/cupom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cupom',
  templateUrl: './list-cupom.page.html',
  styleUrls: ['./list-cupom.page.scss'],
})
export class ListCupomPage implements OnInit {

  constructor(
      private cupomService: CupomService,
      private router: Router
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.cupomService.getAllCupons();
  }

  editPage() {
    this.router.navigate(['admin/edit-cupom', 'new']);
  }
  editItem(quiz) {
    this.router.navigate(['admin/edit-cupom', quiz]);
  }
  deleteItem(description) {
    this.cupomService.deleteCupom(description);
  }

}
