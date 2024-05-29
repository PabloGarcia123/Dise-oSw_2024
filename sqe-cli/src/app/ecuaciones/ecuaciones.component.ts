import { Component, OnInit } from '@angular/core';
import { Equation } from './Equation';
import { EcuacionesService } from '../ecuaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecuaciones',
  templateUrl: './ecuaciones.component.html',
  styleUrls: ['./ecuaciones.component.css']
})

export class EcuacionesComponent implements OnInit {
  currentEquation: Equation = new Equation();
  equations: Equation[] = [];
  hamiltonianoGenerado: any;
  matrizGenerada: any;
  codigoGenerado: any;
  salidaGenerada: any;
  token = sessionStorage.getItem('token');
  h_copiado: boolean = false;
  c_copiado: boolean = false;
  r_copiado: boolean = false;

  constructor(private service: EcuacionesService,private router: Router) { }

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
    //console.log("token metodo", this.token);

    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    // Realizar la solicitud con el token actual
    this.service.generarHamiltoniano(this.token, this.equations).subscribe(
      (response: any) => {
        this.hamiltonianoGenerado = this.formatearHamiltoniano(response);
        alert('Hamiltoniano generado correctamente');
        console.log("respuesta: ", this.hamiltonianoGenerado);
      },
      (error) => {
        alert('Error al generar el Hamiltoniano');
      }
    );
  }
 
  formatearHamiltoniano(response: any): string {
    let formattedResponse = '';
    if (response && response.ecuaciones) {
      response.ecuaciones.forEach((ecuacion: any, index: number) => {
        if (ecuacion.sumandos && ecuacion.sumandos.length > 0) {
          let equationString = '';
          ecuacion.sumandos.forEach((sumando: any) => {
            if (sumando.factor !== undefined && sumando.indexB !== undefined) {
              // Sumando doble
              equationString += `${sumando.factor}x${sumando.index}x${sumando.indexB} + `;
            } else if (sumando.factor !== undefined && sumando.index !== undefined) {
              // Sumando simple
              equationString += `${sumando.factor}x${sumando.index} + `;
            } else {
              // Sumando inválido
              equationString += 'Sumando inválido';
            }
          });
          // Eliminar el último '+'
          equationString = equationString.slice(0, -2);
          formattedResponse += `${equationString}\n`;
        } else {
          formattedResponse += `Hamiltoniano: Sin sumandos\n`;
        }
      });
    } else {
      formattedResponse = 'No se recibió una respuesta válida del servidor.';
    }
    return formattedResponse;
  }

  generarMatriz(): void {
    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    console.log("Ecucaciones: ", this.equations);
    this.service.generarMatriz(this.token || '', this.equations).subscribe(
      (response: any) => {
        this.matrizGenerada = response.matriz;
        alert('Matriz generada correctamente');
        console.log("respuesta: ", this.matrizGenerada);
      },
      (error) => {
        alert('Error al generar la matriz');
      }
    );
  }

  ejecutarCodigo(): void {
    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    console.log("Ecuaciones: ", this.equations);
    // Realizar la solicitud con el token actual
    this.service.ejecutarCodigo(this.token, this.equations).subscribe(
      (response: any) => {
        console.log("respuesta: ", response);
        alert('Código generado correctamente');
        this.codigoGenerado = response.codigo;
        this.salidaGenerada = response.respuesta;
        console.log("respuesta: ", this.codigoGenerado);
      },
      (error) => {
        alert('Error al ejecutar el código');
      }
    );
  }

  copiarHamiltonianoAlPortapapeles(texto: string): void {
    navigator.clipboard.writeText(texto)
    this.h_copiado = true;
  }

  copiarCodigoAlPortapapeles(texto: string): void {
    navigator.clipboard.writeText(texto)
    this.c_copiado = true;
  }

  copiarResultadoAlPortapapeles(texto: string): void {
    navigator.clipboard.writeText(texto)
    this.r_copiado = true;
  }

  resetearCopiadoH() {
    this.h_copiado = false;
  }
  
  resetearCopiadoC() {
    this.c_copiado = false;
  }

  resetearCopiadoR() {
    this.r_copiado = false;
  }

  irPagos(): void {
    this.router.navigate(['/pagos']);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    //alert('Sesión cerrada');
  }

}
