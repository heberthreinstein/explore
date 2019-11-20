import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  form: FormGroup;
  constructor(private auth: AuthenticationService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [[], [Validators.required, Validators.email]]
    });
   }

  ngOnInit() {
  }

  sendEmail() {
    this.auth.forgetPassword(this.form.value.email);
  }

}
