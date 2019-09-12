import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private auth: AuthenticationService,
              private afs: AngularFirestore,
              private storage: Storage) { }

  /**
   * Get the puzzles of the loged user
   */
  getUsersPuzzles() {
    const arrayRet = [];
    const i = 0;
    this.storage.get('uid').then(uid => {
      const docs = this.afs.collection('user_puzzle', pzz => pzz.where('uid', '==', uid));
      docs.valueChanges().forEach( col => {
        col.forEach( userPuzzle => {
          this.afs.doc(userPuzzle.puzzle).valueChanges().forEach(res => {
            arrayRet.push(res);
          });
        });
      });
    });

    return arrayRet;
  }

  /**
   * Get a puzzle by the title
   * @param title Puzzle title
   */
getPuzzleDetails(title: string) {
    return this.afs.collection('puzzles', loc => loc.where('title', '==', title));
  }


}
