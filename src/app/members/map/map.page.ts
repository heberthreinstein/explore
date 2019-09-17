import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { Platform, MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/services/location.service';

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
              private menu: MenuController,
              private lct: LocationService) { }

  ngOnInit() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');

    this.plt.ready().then(() => {
      this.geolocation.getCurrentPosition().then(pos => {

        const mapOptions = {
          zoom: 15,
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

        this.lct.getAllLocation().subscribe( res => {
          res.forEach(el => {
            const div = '<div id="content">' +
              '<div id="siteNotice">' +
              '</div>' +
              el.description +
              '</div>';

            const infoWindow = new google.maps.InfoWindow({
              content: div
            });
            const marker = new google.maps.Marker({
              position: new google.maps.LatLng(el.location.latitude, el.location.longitude),
              title: el.description,
              icon: this.mapService.icons[el.category].icon
            });
            marker.addListener('click', function() {
              infoWindow.open(this.map, marker);
            });
            marker.setMap(this.map);
          });
        });



        const puzzleButtomDiv = document.createElement('div');
        this.mapService.PuzzlesButtom(puzzleButtomDiv, this.map);
        this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(puzzleButtomDiv);

        const profileButtomDiv = document.createElement('div');
        this.mapService.ProfileButtom(profileButtomDiv, this.map);
        this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(profileButtomDiv);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

  }
}
