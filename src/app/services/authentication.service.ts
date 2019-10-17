import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'uid';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  currentUid;
  constructor(
    private storage: Storage,
    private plt: Platform,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.plt.ready().then(() => {
      console.log('chamou check');
      this.checkToken();
    });
  }
  /**
   * Get uid of loged user;
   */
  async getLogedUser() {
    return await this.storage.get(TOKEN_KEY).then(res =>{
      
    });
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
        console.log('check res', res);
        this.authenticationState.next(true);
        this.currentUid = res;
      }
    });
  }

  /**
   * Login user using google
   */
  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    this.afAuth.user.forEach(user => {
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
  isAuthenticated(): boolean {
    return this.authenticationState.value;
  }

  /**
   * Verify if the loged user is an admin
   */
  isAdmin() {
    console.log('uid', this.currentUid); // Não ta funcionado se atualiza a pagina pq to pegando o uid do checktoken
    return this.afs.collection('user', u => u.where('uid', '==', this.currentUid)).valueChanges().pipe( map(user => {
      const u: any = user;
      if (u[0].admin) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
