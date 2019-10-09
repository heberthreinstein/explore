import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(private auth: AuthenticationService) {}

  canActivate(): boolean {
    this.auth.isAdmin().then(res => {
      console.log('act', res);
    });
    return true;
  }
}
