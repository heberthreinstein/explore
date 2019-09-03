import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { Subscription, bindCallback } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { analyzeAndValidateNgModules } from '@angular/compiler';


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

  iffar = {
    lat: -28,
    long: -55
  };

  positionSubscription: Subscription;

  constructor(private auth: AuthenticationService,
              private plt: Platform,
              public navCtrl: NavController,
              private geolocation: Geolocation,
              private storage: Storage,
              public alertController: AlertController) { }





ngOnInit() {
  console.log('init');
  this.plt.ready().then(() => {
      this.loadHistoricRoutes();
      console.log('historico');
      this.geolocation.getCurrentPosition().then(pos => {
        console.log('my coordinates');

        const styledMapType = new google.maps.StyledMapType([
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#d38360'
              }
            ]
          },
          {
            elementType: 'labels',
            stylers: [
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#523735'
              }
            ]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#f5f1e6'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#c9b2a6'
              },
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#dcd2be'
              },
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#ae9e90'
              }
            ]
          },
          {
            featureType: 'poi',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#93817c'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#a5b076'
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#447530'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#ffa381'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {
                color: '#806b63'
              },
              {
                visibility: 'simplified'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e98d58'
              }
            ]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#db8555'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#806b63'
              }
            ]
          },
          {
            featureType: 'transit',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8f7d77'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#ebe3cd'
              }
            ]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [
              {
                color: '#dfd2ae'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#b9d3c2'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#92998d'
              }
            ]
          }
        ],
          { name: 'Styled Map' });

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

        this.map.mapTypes.set('styled_map', styledMapType);
        this.map.setMapTypeId('styled_map');


        const iffarString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          'IFFar' +
          '</div>';

        const fernandoString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          "Fernando's house" +
          '</div>';

        const iffarInfo = new google.maps.InfoWindow({
          content: iffarString
        });
        const fernandoInfo = new google.maps.InfoWindow({
          content: fernandoString
        });

        const fernando = new google.maps.Marker({
          position: new google.maps.LatLng(-28.666435, -55.995626),
          title: 'Casa do Fernando'
        });
        fernando.addListener('click', function() {
          fernandoInfo.open(this.map, fernando);
        });

        const iffar = new google.maps.Marker({
          position: new google.maps.LatLng(-28.666962, -55.994762),
          title: 'Casa do Fernando'
        });

        iffar.addListener('click', function() {
          iffarInfo.open(this.map, iffar);
        });

        // To add the marker to the map, call setMap();
        fernando.setMap(this.map);
        iffar.setMap(this.map);


        console.log('criou o map');
        }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

irIffar() {
  this.positionSubscription = this.geolocation.watchPosition()
    .pipe(
      filter((p) => p.coords !== undefined) // Filter Out Errors
    )
    .subscribe(data => {
      setTimeout(() => {
          const position = new google.maps.Marker({
            position: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
            title: 'live',
            color: 'blue'
          });
          position.setMap(this.map);
      }, 500);
    });
}


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
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
