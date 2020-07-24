import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private afs: AngularFirestore) { }

    quizCollection = this.afs.collection('quiz');

    getQuizByLocation(location: String){
        return this.afs.collection('question', q => q.where('location', '==', location));
    }

    getUserLastQuestion(uid, location){
        return this.afs.collection('userQuiz', q => q.where('uid', '==', uid).where('location', '==', location)).valueChanges();
    }
}
