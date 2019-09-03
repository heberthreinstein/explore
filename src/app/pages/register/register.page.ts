import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: string;
  pass: string;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  registrar () {
    console.log(this.user);
    this.auth.register(this.user, this.pass);
  }

}
