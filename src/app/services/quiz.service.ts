import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class QuizService {


    constructor(private afs: AngularFirestore,
        private alert: AlertaService) { }

    quizCollection = this.afs.collection('quiz');

    updateUserLastQuestion(uid: string, puzzle: any, order: number, points: number) {
        const userQuiz = {
            uid: uid,
            puzzle: puzzle,
            order: order,
            points: points
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
            order: order,
            points: 1
        };
        this.afs.collection('userQuiz').add(userQuiz);
    }

    getQuizByPuzzle(puzzle: String) {
        return this.afs.collection('question', q => q.where('puzzle', '==', puzzle));
    }

    getUserLastQuestion(uid, puzzle) {
        return this.afs.collection('userQuiz', q => q.where('uid', '==', uid).where('puzzle', '==', puzzle)).valueChanges();
    }

    getAllQuestions() {
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
    updateQuestion(question: string, q: { question: any; puzzle: any; order: number; answer: any; options: any[]; }) {
        const obj = {
            question: q.question,
            puzzle: q.puzzle,
            order: q.order,
            answer: q.answer,
            options: q.options
        };
        this.afs.collection('question').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const loc: any = item.payload.doc.data();
                if (loc.question === question) {
                    this.afs.collection('question').doc(item.payload.doc.id.toString()).update(obj);
                    this.alert.toast({ message: 'Salvo com sucesso!' });

                }
            }
            )
        ));
    }
    setQuestion(q: { question: any; puzzle: any; order: number; answer: any; options: any[]; }) {
        const obj = {
            question: q.question,
            puzzle: q.puzzle,
            order: q.order,
            answer: q.answer,
            options: q.options
        }
        console.log(obj);

        this.afs.collection('question').add(obj);
        this.alert.toast({ message: 'Salvo com sucesso!' });
    }
    getQuestion(question: string): any {
        return this.afs.collection('question', q => q.where('question', '==', question)).valueChanges();
    }
    subtractPoint(uid: string, puzzle: any) {
        this.afs.collection('userQuiz').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const ulq: any = item.payload.doc.data();
                if (ulq.uid == uid && ulq.puzzle == puzzle) {
                        ulq.points = ulq.points - 1;
                    this.afs.collection('userQuiz').doc(item.payload.doc.id.toString()).update(ulq);
                }
            }
            )
        ));
    }
}
