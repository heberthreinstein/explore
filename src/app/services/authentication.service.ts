import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';


const TOKEN_KEY = 'uid';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(
    private storage: Storage,
    private plt: Platform,
    public afAuth: AngularFireAuth
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    this.afAuth.user.forEach(user => {
      console.log('user.uid');
      console.log(user.uid);
      this.storage.set(TOKEN_KEY, user.uid).then(() => {
        this.authenticationState.next(true);
    });
    });
  }


  register(user: string,pass: string){
    this.afAuth.auth.createUserWithEmailAndPassword(user,pass);
  }

  loginEmail(user,pass){
    this.afAuth.auth.signInWithEmailAndPassword(user,pass);
    this.afAuth.user.forEach(user => {
      console.log('user.uid');
      console.log(user.uid);
      this.storage.set(TOKEN_KEY, user.uid).then(() => {
        this.authenticationState.next(true);
    });
  });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    console.log('isAutenticated');
    console.log(this.authenticationState.value);
    return this.authenticationState.value;
  }
}
