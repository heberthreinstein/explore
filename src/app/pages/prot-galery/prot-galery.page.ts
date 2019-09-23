import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prot-galery',
  templateUrl: './prot-galery.page.html',
  styleUrls: ['./prot-galery.page.scss'],
})
export class ProtGaleryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoDetails(){
    this.router.navigate(['prot-details']);
  }

}
