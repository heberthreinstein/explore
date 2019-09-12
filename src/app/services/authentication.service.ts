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
  /**
   * Get uid of loged user;
   */
  getLogedUser() {
    return this.storage.get(TOKEN_KEY);
  }

  getLogedUserInformations() {
    return this.afAuth.auth.currentUser;
  }

  /**
   * Check if there is a user Token save on local storage
   * and changes the authenticationState to true
   */
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  /**
   * Login user using google
   */
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
/**
 * Login user using facebook
 */
  loginFacebook() {
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
    this.afAuth.user.forEach(user => {
      console.log('user.uid');
      console.log(user.uid);
      this.storage.set(TOKEN_KEY, user.uid).then(() => {
        this.authenticationState.next(true);
      });
    });
  }

  /**
   * Register a new account with email and password
   * @param user User email
   * @param pass User password
   */
  register(user: string, pass: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(user, pass);
    this.storage.set(TOKEN_KEY, this.afAuth.auth.currentUser.uid).then(() => {
      this.authenticationState.next(true);
    });
  }

  /**
   * Login with email and password
   * @param user User email
   * @param pass User password
   */
  loginEmail(user, pass) {
    this.afAuth.auth.signInWithEmailAndPassword(user, pass);
    this.afAuth.user.forEach(user => {
      this.storage.set(TOKEN_KEY, user.uid).then(() => {
        this.authenticationState.next(true);
    });
  });
  }

  /**
   * Logout the user
   * Remove the Token from local storage and
   * changes authentication service to false
   */
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  /**
   * Verify if the user is authenticated by
   * getting the value from authenticationState;
   */
  isAuthenticated() {
    console.log(this.authenticationState.value);
    return this.authenticationState.value;
  }
}
