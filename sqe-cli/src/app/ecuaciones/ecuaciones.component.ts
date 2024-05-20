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
  hamiltonianoGenerado: any;
  matrizGenerada: any;
  token = sessionStorage.getItem('token');
  copiado: boolean = false;


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
    //console.log("token metodo", this.token);

    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    // Realizar la solicitud con el token actual
    this.service.generarHamiltoniano(this.token, this.equations).subscribe(
      (response: any) => {
        alert('Hamiltoniano generado correctamente');
        console.log("respuesta: ", response);
        this.hamiltonianoGenerado = this.formatearHamiltoniano(response);
        console.log("respuesta: ", this.hamiltonianoGenerado);
      },
      (error) => {
        alert('Error al generar el Hamiltoniano');
      }
    );
  }
  // Generar una cadena de texto con la información de las ecuaciones y sumandos
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

  ejecutarCodigo(): void {
    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    console.log("Ecucaciones: ", this.equations);
    // Realizar la solicitud con el token actual
    this.service.ejecutarCodigo(this.token, this.equations).subscribe(
      (response: any) => {
        alert('Código ejecutado correctamente');
        //this.respuesta = response.p;
      },
      (error) => {
        alert('Error al ejecutar el código');
      }
    );
  }

  generarMatriz(): void {
    if (!this.token) {
      console.error('No se ha encontrado un token válido.');
      return;
    }
    console.log("Ecucaciones: ", this.equations);
    this.service.generarMatriz(this.token || '', this.equations).subscribe(
      (response: any) => {
        alert('Matriz generada correctamente');
        console.log("respuesta: ", response);
        this.matrizGenerada = response.matriz;
        console.log("respuesta: ", this.matrizGenerada);
      },
      (error) => {
        alert('Error al generar la matriz');
      }
    );
  }

  copiarAlPortapapeles(texto: string): void {
    navigator.clipboard.writeText(texto)
    this.copiado = true;
  }
  resetearCopiado() {
    this.copiado = false;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    //alert('Sesión cerrada');
  }

}
