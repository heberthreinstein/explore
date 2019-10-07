import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {

  urlParam = this.activRouter.snapshot.paramMap.get('location');
  description;
  longitude;
  latitude;

  constructor(private location: LocationService,
              private activRouter: ActivatedRoute) { }

  ngOnInit() {
    this.location.getLocationInformation(this.urlParam).forEach(l =>
      l.forEach( l => {
        this.description = l.description;
        this.latitude = l.location.latitude;
        this.longitude = l.location.longitude;
      })

      );
  }

  save() {
    if (this.urlParam == 'new') {
      this.setLocation();
     } else {
      this.editLocation();
     }
  }
  editLocation() {
    this.location.updateLocation(
      this.urlParam,
      { description: this.description,
        longitude: this.longitude,
        latitude: this.latitude
      });
  }
  setLocation() {
    this.location.setLocation({
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude
    });
  }

}
