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
  getUsersPuzzles(): any {
    const arrayRet = [];
    const i = 0;
    this.storage.get('uid').then(uid => {
      const col = this.afs.collection('user_puzzle', pzz => pzz.where('uid', '==', uid));
      col.snapshotChanges().subscribe(res => {
        res.forEach( doc => {
          const userPuzzle = doc.payload.doc;
          const data: any = userPuzzle.data();
          const ret = {
            puzzle: [],
            history: [],
            stage: {}
          };
          this.afs.doc(data.puzzle).valueChanges().forEach(res => {
            const r: any = res;
            ret.puzzle = r;
            this.afs.collection('user_puzzle/' + userPuzzle.id.toString() + '/history').valueChanges().forEach( his => {
              ret.history = his;
              his.forEach(hi => {
                const h: any = hi;
                this.afs.doc(h.stage).valueChanges().forEach(stage => {
                  const stl = {
                    stage: {},
                    location: {}
                  };
                  const s: any = stage;
                  stl.stage = s;
                  this.afs.doc(s.location).valueChanges().forEach(loc => {
                    stl.location = loc;
                  });
                  ret.stage = stl;
                });
              });
            });
          });
          arrayRet.push(ret);
        });
      });
    });
    console.log('return', arrayRet);
    return arrayRet;
  }

  /**
   * Get a puzzle by the title
   * @param title Puzzle title
   */
getPuzzleDetails(title: string) {
    return this.afs.collection('puzzles', loc => loc.where('title', '==', title)).valueChanges();
  }


}
