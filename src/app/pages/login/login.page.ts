import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  verifyingEmail = false;
  code: string;

  constructor(private session: SessionService, public afAuth: AngularFireAuth,
              private route: Router, private storage: Storage) { }

  ngOnInit() {
  }

  logIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if (this.afAuth.user) {
      this.afAuth.user.forEach(user => {
        this.storage.set('username', user.displayName);
        this.setEmail(user);
        this.storage.set('userloged', true);
        setTimeout( () => { this.route.navigateByUrl('/home'); }, 5000 );
      });
    } else {

    }

  }


  setEmail(user) {
    if (user.emailVerified) {
      this.storage.set('username', user.email);
    } else {
      this.sendVerificationEmail(user);
      this.verifyEmail(user);
    }
  }

  verifyEmail(user) {
    this.verifyingEmail = true;
    this.afAuth.auth.applyActionCode(this.code);
    this.verifyingEmail = false;
    this.setEmail(user);
  }

  sendVerificationEmail(user) {
    user.sendEmailVerification();
  }

}
