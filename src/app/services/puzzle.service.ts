import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private afs: AngularFirestore,
              private auth: AuthenticationService) {}


  /**
   * Get Logged puzzles unlocked for current user
   */
  getUserPuzzle() {
    return this.afs.collection('user_puzzle', up => up.where('uid', '==', this.auth.getLogedUserInformations().uid));
  }

  getPuzzleByTitle(title: string) {
    return this.afs.collection('puzzle', p => p.where('title', '==', title)).get().pipe( map(res => {
      return res.docs.forEach(doc => {
        return doc.ref.collection('stages');
      });
    }));
  }
}
