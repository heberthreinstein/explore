import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertaService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private al: AlertaService
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
  async register(user: string, pass: string, nome) {
    const loading = await this.al.loading();
    this.afAuth.auth.createUserWithEmailAndPassword(user, pass).then(
      credencias => {
        credencias.user
          .updateProfile({
            displayName: nome
          })
          .then(() => {
            // envia um email de confirmacao
            this.afAuth.auth.currentUser.sendEmailVerification();
            this.afAuth.auth.signOut();
            loading.dismiss();
            this.al.alert('Cadastro efetivado com sucesso! Verifique seu email', {
              buttons: [
                {
                  text: 'continuar',
                  handler: () => {
                    this.router.navigate(['login']);
                  }
                }
              ]
            });
          });
      },
      erro => {
        loading.dismiss();
        if (erro.code === 'auth/invalid-email') {
          this.al.alert('Email inválido');
        }
        console.log(erro);
      }
    );
  }

  /**
   * Login with email and password
   * @param user User email
   * @param pass User password
   */
  async loginEmail(email, pass) {
    const loading = await this.al.loading();
    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(
      user => {
        loading.dismiss();
        if (user.user.emailVerified) {
          this.router.navigate(['members']);
        } else {
          this.al.toast({ message: 'Acesso negado verifique seu email ' });
          user.user.sendEmailVerification();
          this.logout();
        }
      },
      error => {
        loading.dismiss();
        this.al.toast({ message: 'Usuário ou senha inválidos' });
      }
    );
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
      return this.afs.collection('user', u => u.where('uid', '==', this.afAuth.auth.currentUser.uid)).valueChanges(user => {
        if (user[0].admin) {
          return true;
        } else {
          return false;
        }
      });
    }));
  }
}
