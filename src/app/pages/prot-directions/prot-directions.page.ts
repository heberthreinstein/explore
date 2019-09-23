import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';

declare const google;

@Component({
  selector: 'app-prot-directions',
  templateUrl: './prot-directions.page.html',
  styleUrls: ['./prot-directions.page.scss'],
})
export class ProtDirectionsPage implements OnInit {

  currentMapTrack = null;
  trackedRoute = [];

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  mapOptions = {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.roadmap,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    center: new google.maps.LatLng(-28.659432,  -56.003433)
  };
  map: any;

  constructor(
    private mapService: MapsService
  ) { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    this.map.mapTypes.set('styled_map', this.mapService.styledMapType);
    this.map.setMapTypeId('styled_map');
/*
    this.directionsRenderer.setMap(this.map);
    const request = {
      origin: new google.maps.LatLng(-28.649889, -56.029506),
      destination: new google.maps.LatLng(-28.6604238, -56.005892),
      travelMode: 'WALKING'
    };

    this.directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        console.log('entrou');
        this.directionsRenderer.setDirections(result);
      }
    });*/
    this.trackedRoute.push({ lat: -28.659084, lng: -56.001355 });
    this.trackedRoute.push({ lat: -28.659710, lng: -56.005283 });
    this.trackedRoute.push({ lat: -28.6604238, lng: -56.005892 });
    this.redrawPath(this.trackedRoute);

    const div = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          'Museu Getulio Vargas' +
          '</div>';

    const infoWindow = new google.maps.InfoWindow({
      content: div
    });
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(-28.659084, -56.001355),
      title: 'Museu Getulio Vargas',
      icon: this.mapService.icons['presidentes'].icon
    });
    marker.addListener('click', function() {
      infoWindow.open(this.map, marker);
    });
    marker.setMap(this.map);

    const div2 = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          'Mausoléu Getulio Vargas' +
          '</div>';

    const infoWindow2 = new google.maps.InfoWindow({
      content: div2
    });
    const marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(-28.6604238, -56.005892),
      title: 'Mausoléu Getulio Vargas',
      icon: this.mapService.icons['presidentes'].icon
    });
    marker2.addListener('click', function() {
      infoWindow2.open(this.map, marker2);
    });
    marker2.setMap(this.map);

    const div3 = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          'Padaria' +
          '</div>';

    const infoWindow3 = new google.maps.InfoWindow({
      content: div3
    });
    const marker3 = new google.maps.Marker({
      position: new google.maps.LatLng(-28.659481, -56.003716),
      title: 'Padaria',
      icon: this.mapService.icons['pao'].icon
    });
    marker3.addListener('click', function() {
      infoWindow3.open(this.map, marker3);
    });
    marker3.setMap(this.map);

    const puzzleButtomDiv = document.createElement('div');
    this.mapService.PuzzlesButtom(puzzleButtomDiv, this.map);
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(puzzleButtomDiv);

    const profileButtomDiv = document.createElement('div');
    this.mapService.ProfileButtom(profileButtomDiv, this.map);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(profileButtomDiv);
  }


redrawPath(path) {
  if (this.currentMapTrack) {
    this.currentMapTrack.setMap(this.map);
  }

  if (path.length > 1) {
    this.currentMapTrack = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#a01d1d',
      strokeOpacity: 1.0,
      strokeWeight: 10
    });
    this.currentMapTrack.setMap(this.map);
  }
}
}

