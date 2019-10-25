import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private afs: AngularFirestore,
              private auth: AuthenticationService) {}
  /**
   * Get a puzzle by the title
   * @param title Puzzle title
   */
  getPuzzleDetails(title: string) {
    return this.afs.collection('puzzle', loc => loc.where('title', '==', title)).snapshotChanges();
  }

  /**
   * Get a document of a puzzle by path
   * @param path path for document
   */
  getPuzzleDetailsDoc(path: string) {
    return this.afs.doc(path);
  }

  /**
   * Get Logged puzzles unlocked for current user
   */
  getUserPuzzle() {
    return this.afs.collection('user_puzzle', up => up.where('uid', '==', this.auth.getLogedUserInformations().uid)).snapshotChanges();
  }

  /**
   * get history collection based on id of a UserPuzzle;
   * @param id id of UserPuzzle
   */
  getUserPuzzleHistory(id: string) {
    return this.afs.collection('user_puzzle/' + id + '/history', h => h.orderBy('stage')).snapshotChanges();
  }

  getNextStage(id: string) {
    return this.afs.collection('user_puzzle/' + id + '/history').snapshotChanges();
  }

  getPuzzleStageDocByOrder(order: string) {
    return this.afs.collection('puzzle_stage', ps => ps.where('order', '==', order));
  }

}
