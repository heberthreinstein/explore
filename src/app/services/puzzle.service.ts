import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertaService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class PuzzleService {

    constructor(private afs: AngularFirestore,
        private auth: AuthenticationService,
        private alert: AlertaService) { }


    /**
     * Get Logged puzzles unlocked for current user
     */
    getUserPuzzle() {
        return this.afs.collection('user_puzzle', up => up.where('uid', '==', this.auth.getLogedUserInformations().uid));
    }

    getPuzzleByTitle(title: string): any {
        return this.afs.collection('puzzle', p => p.where('title', '==', title)).valueChanges();
    }

    getAllPuzzles() {
        return this.afs.collection('puzzle').valueChanges();
    }
    deletePuzzle(title: any) {
        this.afs.collection('puzzle').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const data: any = item.payload.doc.data();
                if (data.title === title) {
                    this.afs.collection('puzzle').doc(item.payload.doc.id.toString()).delete();
                }
            }
            )
        ));
    }

    setPuzzle(puzzle: { description: string, title: string}) {
        const loc = {
            description: puzzle.description,
            title: puzzle.title
        };
        this.afs.collection('puzzle').add(loc);
        this.alert.toast({ message: 'Salvo com sucesso!' });
    }

    updatePuzzle(title, puzzle: { description: string, title: string }): any {
        const locat = { 
            description: puzzle.description,
            title: puzzle.title
        };
        this.afs.collection('puzzle').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const loc: any = item.payload.doc.data();
                if (loc.title === title) {
                    this.afs.collection('puzzle').doc(item.payload.doc.id.toString()).update(locat);
                    this.alert.toast({ message: 'Salvo com sucesso!' });


                }
            }
            )
        ));
    }
}
