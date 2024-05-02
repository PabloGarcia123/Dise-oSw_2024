import { Component, OnInit } from '@angular/core';
import { Equation } from './Equation';
import { EcuacionesService } from '../ecuaciones.service';

@Component({
  selector: 'app-ecuaciones',
  templateUrl: './ecuaciones.component.html',
  styleUrls: ['./ecuaciones.component.css']
})

export class EcuacionesComponent implements OnInit {
  currentEquation: Equation = new Equation();
  equations: Equation[] = [];
  hamiltoniano: Equation = new Equation();
  respuesta: any;
  token = sessionStorage.getItem('token');


  constructor(private service: EcuacionesService) { }

  ngOnInit(): void {

  }

  

  add(): void {
    const copia = new Equation();
    copia.eq = this.currentEquation.eq;
    copia.lambda = this.currentEquation.lambda;
    this.equations.push(copia);
  }

  remove(equation: Equation): void {
    for (let i = 0; i < this.equations.length; i++) {
      if (this.equations[i] === equation) {
        this.equations.splice(i, 1);
        break;
      }
    }
  }

  generarHamiltoniano(): void {
    console.log("token metodo",this.token);
    
    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    // Realizar la solicitud con el token actual
    this.service.generarHamiltoniano(this.token, this.equations).subscribe(
      (response: any) => {
        alert('Hamiltoniano generado correctamente');
        console.log("response: ",response);
        this.hamiltoniano = response;
        console.log("respuesta: ",this.hamiltoniano);
        console.log("respuesta: ",this.hamiltoniano.eq);
      },
      (error) => {
        alert('Error al generar el Hamiltoniano');
      }
    );
  }

  ejecutarCodigo(): void {
    this.service.ejecutarCodigo(this.token || '', this.currentEquation.eq).subscribe(
      (response: any) => {
        alert('Código ejecutado correctamente');
        this.respuesta = response.p;
      },
      (error) => {
        alert('Error al ejecutar el código');
      }
    );
  }

  generarMatriz(): void {
    this.service.generarMatriz(this.token || '', this.currentEquation.eq).subscribe(
      (response: any) => {
        alert('Matriz generada correctamente');
        this.respuesta = response.p;
      },
      (error) => {
        alert('Error al generar la matriz');
      }
    );
  }
  logout(): void {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    //alert('Sesión cerrada');
  }
  
}
