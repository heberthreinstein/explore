import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertaService } from 'src/app/services/alert.service';

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
    private al: AlertaService
  ) {
    this.loginForm = this.fb.group({
      email: [[], [Validators.required, Validators.email]],
      password: [[], [Validators.required]]
    });
  }

  async ngOnInit() {
    const loading = await this.al.loading();
    this.auth.isAuthenticated().subscribe(res => {
      loading.dismiss();
      this.router.navigate(['members']);
      if (!res) {
        loading.dismiss();
      }
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
