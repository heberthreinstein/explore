import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(private auth: AuthenticationService) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAdmin().pipe( tap());
  }
}
