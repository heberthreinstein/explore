import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {

  description;
  longitude;
  latitude;

  constructor(private location: LocationService,
              private activRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  save() {
    if (this.activRouter.snapshot.paramMap.get('location') == 'new') {
      console.log('new');
      this.setLocation();
     } else {
      console.log('else');
      this.editLocation();
     }
  }
  editLocation() {
    this.location.updateLocation(
      this.activRouter.snapshot.paramMap.get('location'),
      { description: this.description,
        logintude: this.longitude,
        latitude: this.latitude
      });
  }
  setLocation() {
    this.location.setLocation({
      description: this.description,
      logintude: this.longitude,
      latitude: this.latitude
    });
  }

}
