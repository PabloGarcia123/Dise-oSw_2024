import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // La propiedad es 'styleUrls' en lugar de 'styleUrl'
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
        
        console.log("token login", result.token);
        this.successMessage = '¡Inicio de sesión exitoso!';
        this.error = ''; 
       
        window.location.href = '/ecuaciones';
        
      },
      error => {
        console.log('Error:', error);
        this.error = 'Ha ocurrido un error al iniciar sesión.';
        this.successMessage = ''; // Reinicia el mensaje de éxito
      }
    );
  }
}
