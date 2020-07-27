import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    
    constructor(private afs: AngularFirestore) { }
    
    quizCollection = this.afs.collection('quiz');
    
    updateUserLastQuestion(uid: string, puzzle: any, order: number) {
        const userQuiz = {
            uid: uid,
            puzzle: puzzle,
            order: order
        };
        this.afs.collection('userQuiz').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const ulq: any = item.payload.doc.data();
                if (ulq.uid == uid && ulq.puzzle == puzzle) {
                    this.afs.collection('userQuiz').doc(item.payload.doc.id.toString()).update(userQuiz);
                }
            }
            )
        ));
    }

    setUserLastQuestion(uid: string, puzzle: string, order: number) {
        const userQuiz = {
            uid: uid,
            puzzle: puzzle,
            order: order
        };
        this.afs.collection('userQuiz').add(userQuiz);
    }
    
    getQuizByPuzzle(puzzle: String){
        return this.afs.collection('question', q => q.where('puzzle', '==', puzzle));
    }

    getUserLastQuestion(uid, puzzle){
        return this.afs.collection('userQuiz', q => q.where('uid', '==', uid).where('puzzle', '==', puzzle)).valueChanges();
    }

    getAllQuestions(){
        return this.afs.collection('question').valueChanges();
    }
    
    deleteQuestion(question: any) {
        this.afs.collection('question').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const data: any = item.payload.doc.data();
                if (data.question === question) {
                    this.afs.collection('question').doc(item.payload.doc.id.toString()).delete();
                }
            }
            )
        ));

    }
}
