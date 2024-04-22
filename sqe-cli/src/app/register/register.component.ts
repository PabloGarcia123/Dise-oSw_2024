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
  
  constructor( private userService: UsersService) { }
  
  ngOnInit(): void {
  }

  registrar() {
    this.userService.registrar(this.email, this.pwd1, this.pwd2).subscribe(
      result => {
        //alert('Usuario registrado')
      },
      error => {
        this.error = error;
      }
    ); // Add closing parenthesis here
  }

}
