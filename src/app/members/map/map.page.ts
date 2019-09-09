import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { Platform, MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: any;

  constructor(private mapService: MapsService,
              private plt: Platform,
              private geolocation: Geolocation,
              private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');

    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition().then(pos => {

        const mapOptions = {
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.roadmap,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
        };


        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.map.mapTypes.set('styled_map', this.mapService.styledMapType);
        this.map.setMapTypeId('styled_map');
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
}
