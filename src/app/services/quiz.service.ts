import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    
    constructor(private afs: AngularFirestore) { }
    
    quizCollection = this.afs.collection('quiz');
    
    updateUserLastQuestion(uid: string, location: any, order: number) {
        const userQuiz = {
            uid: uid,
            location: location,
            order: order
        };
        this.afs.collection('userQuiz').snapshotChanges().subscribe(res => (
            res.forEach(item => {
                const ulq: any = item.payload.doc.data();
                if (ulq.uid == uid && ulq.location == location) {
                    this.afs.collection('userQuiz').doc(item.payload.doc.id.toString()).update(userQuiz);
                }
            }
            )
        ));
    }

    setUserLastQuestion(uid: string, location: string, order: number) {
        const userQuiz = {
            uid: uid,
            location: location,
            order: order
        };
        this.afs.collection('userQuiz').add(userQuiz);
    }
    
    getQuizByLocation(location: String){
        return this.afs.collection('question', q => q.where('location', '==', location));
    }

    getUserLastQuestion(uid, location){
        return this.afs.collection('userQuiz', q => q.where('uid', '==', uid).where('location', '==', location)).valueChanges();
    }
}
