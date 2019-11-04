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
              private geolocation: Geolocation,
              private menu: MenuController,
              private lct: LocationService) { }

  ngOnInit() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');

    const mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.roadmap,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      center: new google.maps.LatLng(-28.6604238, -56.005892)
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
      const myloc = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
              new google.maps.Size(22, 22),
              new google.maps.Point(0, 18),
              new google.maps.Point(11, 11)),
        shadow: null,
        zIndex: 999,
        map: this.map
      });

      this.geolocation.watchPosition().subscribe(pos => {
        const me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        myloc.setPosition(me);
        this.map.setCenter(me);
      });

      const puzzleButtomDiv = document.createElement('div');
      this.mapService.PuzzlesButtom(puzzleButtomDiv, this.map);
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(puzzleButtomDiv);

      const profileButtomDiv = document.createElement('div');
      this.mapService.ProfileButtom(profileButtomDiv, this.map);
      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(profileButtomDiv);
    });

    

  }
}
