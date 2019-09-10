import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private auth: AuthenticationService,
              private afs: AngularFirestore) { }

  /**
   * Get the puzzles of the loged user
   */
  getUsersPuzzles() {
   return this.afs.collection('puzzle').valueChanges();
  }

  /**
   * Get a puzzle by the title
   * @param title Puzzle title
   */
  getPuzzleDetails(title: string) {
    return this.afs.collection('puzzles', loc => loc.where('title', '==', title));
  }


}
