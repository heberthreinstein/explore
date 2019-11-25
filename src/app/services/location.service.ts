import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from './alert.service';
import { AngularFireStorage } from '@angular/fire/storage';


import { firestore } from 'firebase';
declare var google;
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private geolocation: Geolocation,
    private afs: AngularFirestore,
    private alert: AlertaService,
    private storage: AngularFireStorage
    ) { }
  locationCollection = this.afs.collection('location');
  categoryCollection = this.afs.collection('category');

  /**
   * Insert a location in database
   */
  setLocation(location: { description: string, latitude: number, longitude: number, category: string}) {
    const geoPoint = new firestore.GeoPoint(location.latitude, location.longitude);
    const loc = {
      description: location.description,
      location: geoPoint,
      category: location.category
    };
    this.locationCollection.add(loc);
    this.alert.toast({message: 'Salvo com sucesso!'});
  }
  /**
   * Get a colection with specific location by description
   * @param description Location description
   */
  getLocation(description: string): any {
    return this.afs.collection('location', loc => loc.where('description', '==', description));
  }
  /**
   * Get all the information of specific a location
   * @param description Location description
   */
  getLocationInformation(description: string): any {
    return this.afs.collection('location', loc => loc.where('description', '==', description)).valueChanges();
  }
  /**
   * Get all locations
   */
  getAllLocation(): any {
    return this.locationCollection.valueChanges();
  }

  /**
   * Update a location based on the description
   */
  updateLocation(description, location: {description: string, latitude: number, longitude: number, category: string}): any {
    const geoPoint = new firestore.GeoPoint(location.latitude, location.longitude);
    const locat = {
      description: location.description,
      location: geoPoint,
      category: location.category
    };
    this.locationCollection.snapshotChanges().subscribe(res => (
      res.forEach( item => {
        const loc: any = item.payload.doc.data();
        if (loc.description === description) {
          this.locationCollection.doc(item.payload.doc.id.toString()).update(locat);
        }
      }
    )
    ));
  }

  deleteLocation(description) {
    this.locationCollection.snapshotChanges().subscribe(res => (
      res.forEach( item => {
        const loc: any = item.payload.doc.data();
        if (loc.description === description) {
          this.locationCollection.doc(item.payload.doc.id.toString()).delete();
        }
      }
    )
    ));
  }

  /**
   * Verify if the user are in a specific location
   */
  isHere(latitude: number, longitude: number) {
    console.log('here');
    this.geolocation.watchPosition()
    .pipe(
      filter((p) => p.coords !== undefined) // Filter Out Errors
    ).subscribe(data => {
     const dis = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
        new google.maps.LatLng(latitude, longitude));
     if (dis < 50.0) {
        return true;
      } else {
        return false;
      }
    });
  }

  setCategory(description: string) {
    this.categoryCollection.add({description});
    this.alert.toast({ message: 'Salvo com sucesso!' });
  }
  getAllCategory(): any {
    return this.categoryCollection.valueChanges();
  }
  deleteCategory(description) {
    this.categoryCollection.snapshotChanges().subscribe(res => (
      res.forEach(item => {
        const cat: any = item.payload.doc.data();
        if (cat.description === description) {
          this.categoryCollection.doc(item.payload.doc.id.toString()).delete();
        }
      }
      )
    ));
  }
  updateCategory(description, newDescription: string): any {
    this.categoryCollection.snapshotChanges().subscribe(res => (
      res.forEach(item => {
        const cat: any = item.payload.doc.data();
        if (cat.description === description) {
          this.categoryCollection.doc(item.payload.doc.id.toString()).update({description: newDescription});
        }
      }
      )
    ));
  }
  saveImg(file, description) {
    const task = this.storage.ref('/categoryImg/' + description +'/icon').put(file);
    task.then(res => {
      console.log('task', res);
    })
  }
  getImgUrlbyCategory(description){
    return this.storage.ref('/categoryImg/' + description +'/_52x52').getDownloadURL();
  }
}
