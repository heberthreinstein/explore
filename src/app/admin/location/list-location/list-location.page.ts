import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.page.html',
  styleUrls: ['./list-location.page.scss'],
})
export class ListLocationPage implements OnInit {

  constructor(
    private router: Router,
    private location: LocationService
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.location.getAllLocation();
    this.itens.forEach(item => {
      console.log(item);
    });
  }

  editPage() {
    this.router.navigate(['edit-location', 'new']);
  }
  editItem(description) {
    this.router.navigate(['edit-location', description]);
  }


}
