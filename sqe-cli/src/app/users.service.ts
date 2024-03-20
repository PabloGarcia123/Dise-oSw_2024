import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private client : HttpClient) { }

  registrar(email: string, pwd1: string, pwd2: string) {

    let info = {
      email: email,
      pwd1: pwd1,
      pwd2: pwd2
    };
    return this.client.post('http://localhost:9000/users/registrar', info);
  }

  login(email: string, pwd: string) : Observable<any>{
      
    let info = {
      email: email,
      pwd: pwd,
    };
    return this.client.put('http://localhost:9000/users/login', info);
  }
}