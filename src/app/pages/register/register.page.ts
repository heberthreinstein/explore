import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertaService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nameForm: FormGroup;
  emailForm: FormGroup;
  senhaForm: FormGroup;
  etapa1 = true;
  etapa2 = false;
  etapa3 = false;
  etapa4 = false;
  etapa5 = false;

  constructor(
    private authenticationService: AuthenticationService,
    private alerta: AlertaService,
    private fb: FormBuilder) {
    this.senhaForm = this.fb.group({
      senha1: [[], [Validators.required, Validators.minLength(6)]],
      senha2: [[], [Validators.required, Validators.minLength(6)]]
      });
    this.nameForm = this.fb.group({
      name: [[], [Validators.required]],
    });
    this.emailForm = this.fb.group({
      email: [[], [Validators.required, Validators.email]],
    });
    }

  ngOnInit() {
  }

  finalizaEtapa1() {
    this.etapa1 = false;
    this.etapa2 = true;
  }
  finalizaEtapa2() {
    this.etapa2 = false;
    this.etapa3 = true;
  }
  verificaSenha() {
    if (this.senhaForm.value.senha1 === this.senhaForm.value.senha2) {
      this.registrar(this.emailForm.value.email, this.senhaForm.value.senha1, this.nameForm.value.name);
    } else {
      this.alerta.alert('Senhas não conferem');
    }
  }
  registrar(email: string, senha: string, nome: string) {
    this.authenticationService.register(email, senha, nome);
  }

}
