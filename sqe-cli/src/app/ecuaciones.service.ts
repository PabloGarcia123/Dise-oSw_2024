import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equation } from './ecuaciones/Equation';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EcuacionesService {

  constructor(private client: HttpClient) { }

  generarHamiltoniano(token: string, equations: Equation[]) {
    const headers = new HttpHeaders().set('token', token);
    return this.client.put('http://localhost:8080/ecuaciones/generarHamiltoniano', equations, { "headers": headers });
  }

  generarMatriz(token: string, equations: Equation[]) {
    const headers = new HttpHeaders().set('token', token);
    return this.client.put('http://localhost:8080/ecuaciones/generarMatrizTriangular', equations, { "headers": headers });
  }

  ejecutarCodigo(token: string, equations: any[]): Observable<any> {
    const headers = new HttpHeaders().set('token', token);
    return this.client.put<{codigoGenerado: string, respuesta: string}>('http://localhost:8080/dwave/generarCodigo', equations, { headers });
  }
}