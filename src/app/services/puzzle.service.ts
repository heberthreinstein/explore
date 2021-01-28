import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';
import { AlertaService } from './alert.service';
import { ProtListStagesPage } from '../pages/prot-list-stages/prot-list-stages.page';
import { leftJoin, leftJoinDocument } from '../collectionJoin';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class PuzzleService {
    



    constructor(private afs: AngularFirestore,
        private auth: AuthenticationService,
        private storage: AngularFireStorage,
        private alert: AlertaService) { }


    /**
     * Get Logged puzzles unlocked for current user
     */
    getUserPuzzle() {
        return this.afs.collection('user_puzzle', up => up.where('uid', '==', this.auth.getLogedUserInformations().uid));
    }
    getUserPuzzleByPuzzle(puzzle) {
        return this.afs.collection('user_puzzle', up => 
        up.where('uid', '==', this.auth.getLogedUserInformations().uid)
          .where('puzzle', '==', puzzle)).valueChanges();
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

    setPuzzle(puzzle: { description: string, puzzle: string, stages: any, category: string }) {
        const loc = {
            description: puzzle.description,
            puzzle: puzzle.puzzle,
            category: puzzle.category,
            stages: new Array()
        };
        if (puzzle.stages.length > 0) {
            loc.stages = puzzle.stages;
        }
        this.afs.collection('puzzle').add(loc);
        this.alert.toast({ message: 'Salvo com sucesso!' });
    }

    updatePuzzle(puzzle, p: { description: string, puzzle: string, stages: any, category: string }): any {
        const locat = {
            description: p.description,
            category: p.category,
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

    setUserPuzzle(puzzle: any) {
        const up = {
            puzzle: puzzle,
            nextStage: 1,
            points: 0,
            uid: this.auth.getLogedUserInformations().uid
        }
        this.afs.collection('user_puzzle').add(up);
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

    setNextStage(puzzle: any, points: number) {
        //verify if is the last
        this.afs.collection('user_puzzle').get().subscribe(res => (
            res.forEach(item => {
                const doc: any = item.data();
                console.log('doc', item)
                if (doc.uid == this.auth.getLogedUserInformations().uid && doc.puzzle == puzzle) {
                    this.getPuzzleByTitle(puzzle).subscribe(res => {
                        console.log(res);
                        if (doc.nextStage >= res[0].stages.length) {
                            doc.completed = true;
                            this.setUserAchivment(res[0].category)
                        } else {
                            doc.nextStage = doc.nextStage + 1;
                        }
                        doc.points = doc.points + points;
                        this.afs.collection('user_puzzle').doc(item.id).update(doc);
                    });
                }
            }
            )
        ));
    }

    getPuzzlesByCategory(category){
        return this.afs.collection('puzzle', p => p.where('category', '==', category)).valueChanges();
    }

    setUserAchivment(category){
        const doc = {
            uid: this.auth.getLogedUserInformations().uid,
            category: category
        }
        this.alert.alert('Parabéns! Você ganhou o troféu '+ category + '<br>Ele ficará exposto em seu perfil')
        this.afs.collection('userAchievement').add(doc).catch(error => console.log(error));
    }

    getLoggedUserAchivments(){
        return this.afs.collection('userAchievement', ua => ua.where('uid', '==', this.auth.getLogedUserInformations().uid)).valueChanges();
    }

    updateImagePuzzle(title: string, ip: { title: any; answer: any; options: any[]; }) {
         const obj = {
            title: ip.title,
            answer: ip.answer,
            options: ip.options
        };
        this.afs.collection('imagePuzzle').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const loc: any = item.payload.doc.data();
                if (loc.title === title) {
                    this.afs.collection('imagePuzzle').doc(item.payload.doc.id.toString()).update(obj);
                    this.alert.toast({ message: 'Salvo com sucesso!' });

                }
            }
            )
        ));
    }

    setImagePuzzle(ip: { title: any; answer: any; options: any[]; }) {
         const obj = {
            title: ip.title,
            answer: ip.answer,
            options: ip.options
        }
        console.log(obj);

        this.afs.collection('imagePuzzle').add(obj);
        this.alert.toast({ message: 'Salvo com sucesso!' });
    }

    getImagePuzzle(title: string) {
        return this.afs.collection('imagePuzzle', q => q.where('title', '==', title)).valueChanges();
    }

     getAllImagesPuzzles() {
        return this.afs.collection('imagePuzzle').valueChanges();
    }

    deleteImagePuzzle(title: any) {
        this.afs.collection('imagePuzzle').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const data: any = item.payload.doc.data();
                if (data.title === title) {
                    this.afs.collection('imagePuzzle').doc(item.payload.doc.id.toString()).delete();
                }
            }
            )
        ));
    }
    saveImagePuzzleImg(file: any, title: any, order) {
        const task = this.storage.ref('/imagePuzzle/' + title + '/' + order).put(file);
        task.then(res => {
        console.log('task', res);
    }); 
    }
    getImgUrlbyImagePuzzle(title, order) {
    return this.storage.ref('/imagePuzzle/' + title + '/' + order).getDownloadURL();
  }
    

}
