import { Component } from '@angular/core';
import { PagosService } from '../pagos.service';
//importar stripe
import { Stripe } from '@stripe/stripe-js';

declare let Stripe: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  importe: number = 10000;
  token?: string;
  stripe = Stripe('pk_test_51P1sD3RsjKhkWbXKiJ2xBJhT0tVQnn92NdZazOcLQ6RPYzo4nz0CzsFIu5hMmuBfVgf9N0nEi7W1NVSkg2S7qAl400CaKUltEy')

  constructor(private service: PagosService) { }

  pagar() {
    this.service.pagar(this.importe).subscribe(
      result => {
        this.token = result.clientSecret;
        this.showForm();
      },
      error => {
        console.error('Error al pagar', error);
      }
    );
  }

  showForm() {
    let elements = this.stripe.elements();
    let style = {
      base: {
        color: "#32325d", fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased", fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif', color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    let card = elements.create("card", { style: style });
    card.mount("#card-element");
    card.on("change", function (event: any) {
      document.querySelector("button")!.disabled = event.empty;
      document.querySelector("#card-error")!.textContent = event.error ? event.error.message : "";
    });

    let self = this;
    let form = document.getElementById("payment-form");
    form!.addEventListener("submit", function (event) {
      event.preventDefault();
      self.payWithCard(card);
    });
    form!.style.display = "block";
  }

  payWithCard(card: any) {
    this.stripe.confirmCardPayment(this.token, {
      payment_method: {
        card: card
      }
    }).then((response: any) => {
      if (response.error) {
        alert(response.error.message);
      } else {
        if (response.paymentIntent.status === 'succeeded') {
          alert("Pago exitoso");
          this.service.confirmarPago(this.token).subscribe();
        }
      }
    });
  }
}
