import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertaService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name;
  email;
  senha1;
  senha2;
  codEmail;
  etapa1 = true;
  etapa2 = false;
  etapa3 = false;
  etapa4 = false;
  etapa5 = false;

  constructor(private authenticationService: AuthenticationService,
              private alerta: AlertaService) { }

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
    if (this.senha1 === this.senha2) {
      this.registrar(this.email, this.senha1, this.name);
    } else {
      this.alerta.alert('Senhas não conferem');
    }
  }
  registrar(email: string, senha: string, nome: string) {
    this.authenticationService.register(email, senha, nome);
  }

}
