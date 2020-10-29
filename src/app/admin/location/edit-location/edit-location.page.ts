import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {

  urlParam = this.activRouter.snapshot.paramMap.get('location');
  description;
  images;
  information;
  longitude;
  latitude;
  category;
  categories;
  image1 : File;
  image2 : File;
  image3 : File;

  constructor(private location: LocationService,
              private activRouter: ActivatedRoute,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.location.getLocationInformation(this.urlParam).forEach(ls =>
      ls.forEach( l => {
        this.description = l.description;
        this.latitude = l.location.latitude;
        this.longitude = l.location.longitude;
        this.category = l.category;
        this.information = l.information;
      })
    );
    this.location.getAllCategory().forEach(element => {
      this.categories = element;
    });
  }

  getCurrentLocation() {
    console.log('me', this.location.me);
    this.latitude = this.location.me.lat();
    this.longitude = this.location.me.lng();
  }
  detectFile1(event) {
    this.image1 = event.target.files;
    console.log(this.image1)
  }
  detectFile2(event) {
    this.image2 = event.target.files;
    console.log(this.image2)
  }
  detectFile3(event) {
    this.image3 = event.target.files;
    console.log(this.image3)

  }

save() {
    console.log('aaa')
     if (this.image1) {
     this.location.saveLocationImg(this.image1[0], this.description, '1');
    }
     if (this.image2) {
      console.log(this.location.saveLocationImg(this.image2[0], this.description, '2'));
    }
     if (this.image3) {
      console.log(this.location.saveLocationImg(this.image3[0], this.description, '3'));
    }
    console.log('aabbbba')
    

    const loc = {
      description: this.description,
      longitude: this.longitude,
      latitude: this.latitude,
      category: this.category,
      information: this.information,
    };

    if (this.urlParam === 'new') {
      this.location.setLocation(loc);
     } else {
      this.location.updateLocation(this.urlParam, loc);
     }
  }

}
