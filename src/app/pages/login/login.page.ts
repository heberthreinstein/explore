import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  verifyingEmail = false;
  code: string;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  logIn() {
    this.authService.login();
  }
}
