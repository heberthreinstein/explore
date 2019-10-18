import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_KEY = 'uid';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  currentUid;
  constructor(
    private storage: Storage,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  getLogedUserInformations() {
    return this.afAuth.auth.currentUser;
  }

  /**
   * Login user using google
   */
  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
/**
 * Login user using facebook
 */
  loginFacebook() {
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
  }

  /**
   * Register a new account with email and password
   * @param user User email
   * @param pass User password
   */
  register(user: string, pass: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(user, pass);
  }

  /**
   * Login with email and password
   * @param user User email
   * @param pass User password
   */
  loginEmail(user, pass) {
    this.afAuth.auth.signInWithEmailAndPassword(user, pass);
  }

  /**
   * Logout the user
   * Remove the Token from local storage and
   * changes authentication service to false
   */
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  /**
   * Verify if the user is authenticated by
   * getting the value from authenticationState;
   */
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(usuario => {
        return usuario !== null;
      })
    );
  }

  /**
   * Verify if the loged user is an admin
   */
  isAdmin() {
    console.log('isAdmin');
    return this.isAuthenticated().pipe( map(() => {
      console.log('uid = ', this.afAuth.auth.currentUser.uid);
      this.afs.collection('user', u => u.where('uid', '==', this.afAuth.auth.currentUser.uid)).valueChanges(user => {
        console.log(user);
        return user.admin;
      });
    })
    );
  }
}
