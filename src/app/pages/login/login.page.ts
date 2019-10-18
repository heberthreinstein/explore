import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: string;
  pass: string;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: [[], [Validators.required, Validators.email]],
      password: [[], [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.auth.isAuthenticated().subscribe(res => {
      this.router.navigate(['members']);
    });
  }

  login() {
    this.auth.loginGoogle();
  }
  loginFacebook() {
    this.auth.loginFacebook();
  }

  loginEmail() {
    this.auth.loginEmail(this.loginForm.value.email, this.loginForm.value.password);
  }

  registrar() {
    this.router.navigate(['register']);
  }
}
