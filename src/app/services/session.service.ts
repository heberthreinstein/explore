import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public name;
  public email;
  public loged = false;

  constructor(public route: Router, public storage: Storage) {
    const test = this.storage.get('fbase_key');
    Promise.all([test]).then(console.log);
  }

  public getname(): string {
    return this.name;
  }
  public getemail(): string {
    return this.email;
  }
  public isloged() {
    return this.loged;
  }

  public setName(name: string) {
    this.name = name;
  }
  public setEmail(email: string) {
    this.email = email;
  }
  public setLoged(loged: boolean) {
    this.loged = loged;
  }
}
