import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { Platform, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';

import { Storage } from '@ionic/storage';


declare var google;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {


  @ViewChild('map', { static: false }) mapElement: ElementRef;

  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  positionSubscription: Subscription;

  constructor(private auth: AuthenticationService,
              private plt: Platform,
              public navCtrl: NavController,
              private geolocation: Geolocation,
              private storage: Storage) { }





ngOnInit() {
  console.log('init');
  this.plt.ready().then(() => {
      this.loadHistoricRoutes();
      console.log('historico');
      const mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.roadmap,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log('criou o map');
      this.geolocation.getCurrentPosition().then(pos => {
        const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
        console.log('my coordinates');
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

  }

loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p.coords !== undefined) // Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });

  }

redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(this.map);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }


stopTracking() {
    const newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

showHistoryRoute(route) {
    this.redrawPath(route);
  }

logout() {
    this.auth.logout();
  }

}
