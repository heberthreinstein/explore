import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {

  description;
  longitude;
  latitude;

  constructor(private location: LocationService) { }

  ngOnInit() {
  }

  setLocation(){
    this.location.setLocation({
      description: this.description,
      logintude: this.longitude,
      latitude: this.latitude
    })
  }

}
