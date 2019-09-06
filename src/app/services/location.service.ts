import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter, map } from 'rxjs/operators';
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
  setLocation( location: {description: string, latitude: number, logintude: number}) {
    this.locationCollection.add(location);
    this.alert.toast({message: 'Salvo com sucesso!'});
  }
  /**
   * Get a specific location by description
   * @param description
   */
  getLocation(description: string) {
    return this.afs.collection('location', loc => loc.where('description', '==', description));
  }
  /**
   * Get all locations
   */
  getAllLocation() {
    this.locationCollection = this.afs.collection('location');
    return this.locationCollection.valueChanges();
  }

  /**
   * Update a location based on the description
   */
  updateLocation(description, location: {description: string, latitude: number, logintude: number}) {
    this.locationCollection.snapshotChanges().subscribe(res => (
      res.forEach( item => { 
        let location = item.payload.doc.data();
        if (location.description == description) {
          console.log(item.payload.doc.id);
          /**
           * TODO:
           * Se eu coloco manualmente a string '' vai se eu uso o doc.id não :(
           */
          this.locationCollection.doc(item.payload.doc.id).update(location);
        }
      }
    )
    ));
  }

  /**
   * Verifica se o usuario está em uma localização especifica.
   * @param location
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
