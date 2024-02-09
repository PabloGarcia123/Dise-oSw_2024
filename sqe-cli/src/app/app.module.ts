import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcuacionesComponent } from './ecuaciones/ecuaciones.component';
@NgModule({
  declarations: [
    AppComponent,
 ],
 imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  EcuacionesComponent
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }