import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from './alert.service';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private geolocation: Geolocation,
    private afs: AngularFirestore,
    private alert: AlertaService
  ) { }

  locationCollection = this.afs.collection('location');

  /**
   * Insert a location in database
   */
  setLocation( location: {description: string, latitude: number, longitude: number}) {
    this.locationCollection.add(location);
    this.alert.toast({message: 'Salvo com sucesso!'});
  }
  /**
   * Get a colection with specific location by description
   * @param description Location description
   */
  getLocation(description: string) {
    return this.afs.collection('location', loc => loc.where('description', '==', description));
  }
  /**
   * Get all the information of specific a location
   * @param description Location description
   */
  getLocationInformation(description: string) {
    return this.afs.collection('location', loc => loc.where('description', '==', description)).valueChanges();
  }
  /**
   * Get all locations
   */
  getAllLocation() {
    return this.locationCollection.valueChanges();
  }

  /**
   * Update a location based on the description
   */
  updateLocation(description, location: {description: string, latitude: number, longitude: number}) {
    this.locationCollection.snapshotChanges().subscribe(res => (
      res.forEach( item => {
        let loc = item.payload.doc.data();
        if (loc.description == description) {
          this.locationCollection.doc(item.payload.doc.id.toString()).update(location);
        }
      }
    )
    ));
  }

  /**
   * Verifica se o usuario está em uma localização especifica.
   * @param location an object with latitude and longitude
   */
  isHere(location: {latitude: number, longitude: number}) {
    this.geolocation.watchPosition()
    .pipe(
      filter((p) => p.coords !== undefined) // Filter Out Errors
    ).subscribe(data => {
     const dis = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
        location.latitude, location.longitude);
     if (dis < 50.0) {
        return true;
      } else {
        return false;
      }
    });
  }
}
