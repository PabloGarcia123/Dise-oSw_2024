import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equation } from './ecuaciones/Equation';

@Injectable({
  providedIn: 'root'
})
export class EcuacionesService {

  constructor(private client : HttpClient) { }

  generarHamiltoniano(equations : Equation[]) {
    return this.client.put('http://localhost:8080/generarHamiltoniano', equations);
  }

  
}