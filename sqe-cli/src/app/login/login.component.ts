import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
[x: string]: any;
  email: string = '';
  pwd: string = '';
  error: string = '';
  successMessage: string = '';

  constructor(private userService: UsersService) { }

  ngOnInit(): void {}

  logout(): void {
    sessionStorage.removeItem('token');
    alert('Sesión cerrada');
  }

  login() {
    this.userService.login(this.email, this.pwd).subscribe(
      result => {
        sessionStorage.removeItem('token');
        sessionStorage.setItem('token', result.token);
        this.successMessage = '¡Inicio de sesión exitoso!';
        this.error = ''; 
       
        window.location.href = '/ecuaciones';
        
      },
      error => {
        console.log('Error:', error);
        if (error.status===403){
          this.error='Error en los credenciales'
        }else{
          this.error = 'Ha ocurrido un error al iniciar sesión.';
        }
        setTimeout(() => {
          this.error = '';
        }, 2000);
        this.successMessage = '';
      }
    );
  }
}
