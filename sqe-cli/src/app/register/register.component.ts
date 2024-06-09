import { Component, OnInit} from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  email: string = '';
  pwd1: string = '';
  pwd2: string = '';
  error: string = '';
  pwd_correcta: boolean= false;
  
  constructor( private userService: UsersService) { }
  
  ngOnInit(): void {
  }

  registrar() {
    if (!this.verificarEmail(this.email)) {
      alert('El correo electrónico no es válido. Por favor, ingresa un correo electrónico válido.');
      return; 
  }
    if (this.pwd1 !== this.pwd2) {
      alert('Las contraseñas no coinciden. Por favor, asegúrate de ingresar la misma contraseña en ambos campos.');
      return;
    }

    if (!this.verificarPwdSegura(this.pwd1)) {
      alert('La contraseña no es segura. Debe cumplir los siguientes requisitos: al menos 8 caracteres, 1 número, 1 mayúscula, 1 minúscula y un carácter especial');
      return;
    }
    
    this.userService.registrar(this.email, this.pwd1, this.pwd2).subscribe(
      result => {
        alert('Registro completado con exito')
        window.location.href = '/login';
      },
      error => {
        
        if(error.status=== 409){
          alert('Usuario ya registrado')
        }
        else{
          alert('Error al crear la cuenta')
        }
      }
    ); 
    
  }
  verificarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
  verificarPwdSegura(pwd: string): boolean {
    if (pwd.length < 8) return false;

    if (!/\d/.test(pwd)) return false;

    if (!/[A-Z]/.test(pwd)) return false;

    if (!/[a-z]/.test(pwd)) return false;

    if (!/[^A-Za-z0-9]/.test(pwd)) return false;

    return true;
  }
}
