import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prot-list-stages',
  templateUrl: './prot-list-stages.page.html',
  styleUrls: ['./prot-list-stages.page.scss'],
})
export class ProtListStagesPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  gotoGalery(){
    this.route.navigate(['prot-galery']);
  }
}
