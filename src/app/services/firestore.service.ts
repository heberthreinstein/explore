import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export abstract class FirestoreService {

  collection: string;

  constructor(private af: AngularFirestore, private alert: AlertaService) { }

  insert(obj: any) {
    this.af.collection(this.collection).add(obj).then( res => {
      this.alert.alert({message: 'Gravado com Sucesso'});
    }).catch(error => {
      this.alert.alert({message: error});
    });
  }
}
