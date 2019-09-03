import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  pass: string;

  constructor(private auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginGoogle();
  }

  loginEmail() {
    this.auth.loginEmail(this.user, this.pass);
  }

  registrar() {
    this.router.navigate(['register']);
  }

  dashboard() {
    this.router.navigateByUrl('/members/dashboard');
  }

}
