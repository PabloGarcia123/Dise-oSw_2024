import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equation } from './ecuaciones/Equation';

@Injectable({
  providedIn: 'root'
})
export class EcuacionesService {
  
  constructor(private client : HttpClient) { }

  generarHamiltoniano(token : string, equations : Equation[]) {
    const headers = new HttpHeaders().set('token', token);
    return this.client.put('http://localhost:8080/generarHamiltoniano', equations, {"headers": headers});
  }
  ejecutarCodigo(arg0: any, eq: String) {
      return this.client.post('http://localhost:8080/ejecutarCodigo', eq);
    }
  
}