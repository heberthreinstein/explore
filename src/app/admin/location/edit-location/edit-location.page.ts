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
  category;
  categories;

  constructor(private location: LocationService,
              private activRouter: ActivatedRoute) { }

  ngOnInit() {
    this.location.getLocationInformation(this.urlParam).forEach(ls =>
      ls.forEach( l => {
        console.log(l);
        this.description = l.description;
        this.latitude = l.location.latitude;
        this.longitude = l.location.longitude;
        this.category = l.category;
      })
    );
    this.location.getAllCategory().forEach(element => {
      this.categories = element;
    });
  }

  save() {
    const loc = {
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude,
      category: this.category
    };

    if (this.urlParam === 'new') {
      this.location.setLocation(loc);
     } else {
      this.location.updateLocation(this.urlParam, loc);
     }
  }

}
