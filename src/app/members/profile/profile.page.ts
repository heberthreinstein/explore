import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.user = this.auth.getLogedUserInformations();
  }

  logout() {
    this.auth.logout();
  }

}
