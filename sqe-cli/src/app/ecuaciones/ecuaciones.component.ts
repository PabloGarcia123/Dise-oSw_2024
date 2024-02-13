import { Component } from '@angular/core';
import { Equation } from './Equation';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { EcuacionesService } from '../ecuaciones.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ecuaciones',
  standalone: true,
  imports: [FormsModule, NgFor, HttpClientModule],
  templateUrl: './ecuaciones.component.html',
  styleUrl: './ecuaciones.component.css'
})
export class EcuacionesComponent {

  currentEquation: Equation = new Equation();
  equations: Equation[] = [];
  
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
    this.service.generarHamiltoniano(this.equations).subscribe(
      (response) => {
        alert('Hamiltoniano generado correctamente');
      },
      (error) => {
        alert('Error al generar el Hamiltoniano');
      }
    );
  }
}