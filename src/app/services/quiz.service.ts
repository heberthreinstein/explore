import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private afs: AngularFirestore) { }

    quizCollection = this.afs.collection('quiz');

    getQuizByLocation(location: String){
        return this.afs.collection('quiz', q => q.where('location', '==', location));
    }
}
