import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prot-details',
  templateUrl: './prot-details.page.html',
  styleUrls: ['./prot-details.page.scss'],
})
export class ProtDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.test(undefined, 5);
  }

  test(x = 1, y = 10) {
    console.log(x, y);
  }
}
