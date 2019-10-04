import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {

  constructor(
    private location: LocationService
  ) { }

  ngOnInit() {
    this.location.isHere({latitude: -28.667061, longitude: -55.994823});
  }

}
