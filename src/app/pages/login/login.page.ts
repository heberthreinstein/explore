import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
    let notRedirect = false

    this.auth.afAuth.auth.getRedirectResult().then( authData => {
	    if (authData.additionalUserInfo.isNewUser) {
            this.router.navigate(['members/welcome']);
            notRedirect = true            
        }
    }).catch(function(error) {
	    console.log(error);
    });
  
    this.auth.isAuthenticated().subscribe(res => {
      loading.dismiss();
      if (!notRedirect) {
          this.router.navigate(['members']);
      }
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

  forgetPassword(){
    this.router.navigate(['forget-password']);
  }

}
