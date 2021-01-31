import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { leftJoinDocument } from 'src/app/collectionJoin'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CupomService {
    
    
    

    constructor(private afs: AngularFirestore, private auth: AuthenticationService) { }


    newCupom(title, store, discount, information){
        
        const doc = {
            store: store,
            discount: discount,
            title: title,
            information: information
        }
        
        this.afs.collection('cupom').add(doc)
    }

    newUserCupom(uid, cupomId){
        const doc = {
            uid: uid,
            cupomId: cupomId,
            used: false
        }

        this.afs.collection('userCupom').add(doc)
    }

    getAllCupons(): any {
        return this.afs.collection('cupom').valueChanges();
    }
    
    updateCupom(title: any, store: any, discount: any, information: any) {
        throw new Error("Method not implemented.");
    }

    deleteCupom(description: any) {
        throw new Error("Method not implemented.");
    }

    getLoggedUserCupons(){
        return this.afs.collection('userCupom', uc => uc.where('uid', '==', this.auth.getLogedUserInformations().uid)).valueChanges()
        
        
    }

    getCupomByDocId(id){
        return this.afs.collection('cupom').doc(id).get()
    }


    /**
     * Return userCupom ID
     * @param cupomId 
     * @param uid If not sent will verify based on the loggedUser
     */
     getUserCupomId(cupomId: any, uid = this.auth.getLogedUserInformations().uid){
        return this.afs.collection('userCupom', uc => 
            uc.where('uid', '==', uid)
            .where('cupomId', '==', cupomId),
        ).snapshotChanges()
    }


}
