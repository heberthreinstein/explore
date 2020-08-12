import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class QuizService {


    constructor(private afs: AngularFirestore,
        private alert: AlertaService) { }

    getQuizByTitle(title: string): any {
        return this.afs.collection('quiz', p => p.where('title', '==', title)).valueChanges();
    }
    getAllQuizes() {
        return this.afs.collection('quiz').valueChanges();
    }
    deleteQuiz(title: any) {
        this.afs.collection('quiz').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const data: any = item.payload.doc.data();
                if (data.title === title) {
                    this.afs.collection('quiz').doc(item.payload.doc.id.toString()).delete();
                }
            }
            )
        ));
    }
    setQuiz(title: string) {
        const loc = {
            title: title
        };
        this.afs.collection('quiz').add(loc);
        this.alert.toast({ message: 'Salvo com sucesso!' });
    }

    updateUserLastQuestion(uid: string, quiz: any, order: number, points: number) {
        const userQuiz = {
            uid: uid,
            quiz: quiz,
            order: order,
            points: points
        };
        this.afs.collection('userQuiz').get().subscribe(res => (
            res.forEach(item => {
                const ulq: any = item.data();
                console.log('ulq', item)
                if (ulq.uid == uid && ulq.quiz == quiz) {
                    this.afs.collection('userQuiz').doc(item.id).update(userQuiz);
                }
            }
            )
        ));
    }

    setUserLastQuestion(uid: string, quiz: string, order: number) {
        const userQuiz = {
            uid: uid,
            quiz: quiz,
            order: order,
            points: 1
        };
        this.afs.collection('userQuiz').add(userQuiz);
    }

    getQuestionsByQuiz(quiz: String) {
        return this.afs.collection('question', q => q.where('quiz', '==', quiz).orderBy('order'));
    }

    getUserLastQuestion(uid, quiz) {
        return this.afs.collection('userQuiz', q => q.where('uid', '==', uid).where('quiz', '==', quiz)).valueChanges();
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
    updateQuestion(question: string, q: { question: any; quiz: any; order: number; answer: any; options: any[]; }) {
        const obj = {
            question: q.question,
            quiz: q.quiz,
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
    setQuestion(q: { question: any; quiz: any; order: number; answer: any; options: any[]; }) {
        const obj = {
            question: q.question,
            quiz: q.quiz,
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
    subtractPoint(uid: string, quiz: any) {
        this.afs.collection('userQuiz').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const ulq: any = item.payload.doc.data();
                if (ulq.uid == uid && ulq.quiz == quiz) {
                        ulq.points = ulq.points - 1;
                    this.afs.collection('userQuiz').doc(item.payload.doc.id.toString()).update(ulq);
                }
            }
            )
        ));
    }
}
