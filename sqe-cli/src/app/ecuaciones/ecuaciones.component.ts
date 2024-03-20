import { Component } from '@angular/core';
import { Equation } from './Equation';
import { EcuacionesService } from '../ecuaciones.service';

@Component({
  selector: 'app-ecuaciones',
  templateUrl: './ecuaciones.component.html',
  styleUrl: './ecuaciones.component.css'
})
export class EcuacionesComponent {

  currentEquation: Equation = new Equation();
  equations: Equation[] = [];
  respuesta?: string; 
  manager: any;
  
  constructor(private service: EcuacionesService) { }

  add() : void {
    let copia = new Equation()
    copia.eq = this.currentEquation.eq
    this.equations.push(this.currentEquation);
  }

  remove(equation : Equation){
    for (let i = 0; i < this.equations.length; i++) {
      if (this.equations[i] === equation) {
        this.equations.splice(i, 1)
        break
      }
    }
  }

  generarHamiltoniano(){
    this.service.generarHamiltoniano(this.manager.token!, this.equations).subscribe(
      (response) => {
        alert('Hamiltoniano generado correctamente');
        this.respuesta = response.p;
      },
      (error) => {
        alert('Error al generar el Hamiltoniano');
      }
    );
  }
  ejecutarCodigo(){
    return this.service.ejecutarCodigo(this.manager.token!, this.currentEquation.eq).subscribe(
      (response) => {
        alert('Código ejecutado correctamente');
        this.respuesta = result.p
      },
      (error) => {
        alert('Error al ejecutar el código');
      }
    );
  }
}