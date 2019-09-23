import { Component, OnInit } from '@angular/core';

declare const google;

@Component({
  selector: 'app-prot-directions',
  templateUrl: './prot-directions.page.html',
  styleUrls: ['./prot-directions.page.scss'],
})
export class ProtDirectionsPage implements OnInit {

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  mapOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.roadmap,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    center: new google.maps.LatLng(-28.649889, -56.029506)
  };
  map: any;

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
    this.directionsRenderer.setMap(this.map);
    const request = {
      origin: new google.maps.LatLng(-28.649889, -56.029506),
      destination: new google.maps.LatLng(-28.6604238, -56.005892),
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, function(result, status) {
        this.directionsRenderer.setDirections(result);
    });
  }
}

