import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = '';
  pwd: string = '';
  error: string = '';

  constructor( private userService: UsersService) { }
  ngOnInit(): void {

  }

  login() {
    this.userService.login(this.email, this.pwd).subscribe(
      result => {
        localStorage.setItem('token',result.token);
        sessionStorage.setItem('token',result.token);
        
      },
      error => {
        this.error = error;
      }
    );
  }

}
