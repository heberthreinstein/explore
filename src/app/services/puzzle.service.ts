import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertaService } from './alert.service';
import { ProtListStagesPage } from '../pages/prot-list-stages/prot-list-stages.page';

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

    getPuzzleByTitle(puzzle: string): any {
        return this.afs.collection('puzzle', p => p.where('puzzle', '==', puzzle)).valueChanges();
    }

    getAllPuzzles() {
        return this.afs.collection('puzzle').valueChanges();
    }
    deletePuzzle(puzzle: any) {
        this.afs.collection('puzzle').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const data: any = item.payload.doc.data();
                if (data.puzzle === puzzle) {
                    this.afs.collection('puzzle').doc(item.payload.doc.id.toString()).delete();
                }
            }
            )
        ));
    }

    setPuzzle(puzzle: { description: string, puzzle: string, stages: any }) {
        const loc = {
            description: puzzle.description,
            puzzle: puzzle.puzzle,
            stages: new Array()
        };
        if (puzzle.stages.length > 0) {
            loc.stages = puzzle.stages;
        }
        this.afs.collection('puzzle').add(loc);
        this.alert.toast({ message: 'Salvo com sucesso!' });
    }

    updatePuzzle(puzzle, p: { description: string, puzzle: string, stages: any }): any {
        const locat = {
            description: p.description,
            puzzle: p.puzzle,
            stages: p.stages
        };
        console.log(locat);
        this.afs.collection('puzzle').get().subscribe(res => (
            res.forEach(item => {
                const loc: any = item.data();
                if (loc.puzzle === puzzle) {
                    this.afs.collection('puzzle').doc(item.id.toString()).update(locat);
                    this.alert.toast({ message: 'Salvo com sucesso!' });


                }
            }
            )
        ));
    }
    setPuzzleCompleted(puzzle: any, points: any) {
        this.afs.collection('user_puzzle').get().subscribe(res => (
            res.forEach(item => {
                const doc: any = item.data();
                console.log('doc', item)
                if (doc.uid == this.auth.getLogedUserInformations().uid && doc.puzzle == puzzle) {
                    doc.completed = true;
                    doc.points = points;
                    this.afs.collection('user_puzzle').doc(item.id).update(doc);
                }
            }
            )
        ));
    }

    setNewStage(puzzle: any, type: any, title: any, order: number) {
        const stage = {
            type: type,
            title: title,
            order: order
        }
        this.afs.collection('puzzle').get().subscribe(res => (
            res.forEach(item => {
                const doc: any = item.data();
                    if (doc.puzzle == puzzle) {
                        doc.stages.push(stage)
                        this.afs.collection('puzzle').doc(item.id).update(doc);
                    }
                }
            )
        ));
    }

}
