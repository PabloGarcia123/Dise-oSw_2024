import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private client: HttpClient) { }

  pagar(importe: number) {
    return this.client.get<any>(`http://localhost:9000/payments/prepagar?importe=${importe}`);
  }
  
  confirmarPago(token: any) {
    throw new Error('Method not implemented.');
  }
}
