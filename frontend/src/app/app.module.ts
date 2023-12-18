import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './dashboard/menu-lateral/menu-lateral.component';
import { CabeceraComponent } from './dashboard/cabecera/cabecera.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { MenuComponent } from './landingpage/menu/menu.component';
import { HomeComponent } from './landingpage/home/home.component';
import { CarruselComponent } from './landingpage/carrusel/carrusel.component';
import { NosotrosComponent } from './landingpage/nosotros/nosotros.component';
import { ServiciosComponent } from './landingpage/servicios/servicios.component';
import { EquipoComponent } from './landingpage/equipo/equipo.component';
import { WhatsappComponent } from './landingpage/whatsapp/whatsapp.component';
import { FooterLpComponent } from './landingpage/footer-lp/footer-lp.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';
import { ContenidoComponent } from './dashboard/contenido/contenido.component';
import { UsuariosComponent } from './dashboard/menu-lateral/usuarios/usuarios.component';
import { EmpleadosComponent } from './dashboard/menu-lateral/empleados/empleados.component';
import { VentaEquiposComponent } from './dashboard/menu-lateral/venta-equipos/venta-equipos.component';
import { SoporteTecnicoComponent } from './dashboard/menu-lateral/soporte-tecnico/soporte-tecnico.component';
import { CapacitacionesComponent } from './dashboard/menu-lateral/capacitaciones/capacitaciones.component';
import { CapacitacionFormacionComponent } from './landingpage/servicios/capacitacion-formacion/capacitacion-formacion.component';
import { VentaComputadorasComponent } from './landingpage/servicios/venta-computadoras/venta-computadoras.component';
import { SoporteEquiposComponent } from './landingpage/servicios/soporte-equipos/soporte-equipos.component';
import { ActivateAccountComponent } from './authentication/activate-account/activate-account.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { InterceptorService } from './servicios/interceptor.service';
import { DataTablesModule } from 'angular-datatables';
import { CookieService } from 'ngx-cookie-service';
import { VentaDetallesComponent } from './landingpage/servicios/venta-computadoras/venta-detalles/venta-detalles.component';
import { SubirarchivosComponent } from './componentes/subirarchivos/subirarchivos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    CabeceraComponent,
    FooterComponent,
    InicioComponent,
    MenuComponent,
    HomeComponent,
    CarruselComponent,
    NosotrosComponent,
    ServiciosComponent,
    EquipoComponent,
    WhatsappComponent,
    FooterLpComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    ContenidoComponent,
    UsuariosComponent,
    EmpleadosComponent,
    VentaEquiposComponent,
    SoporteTecnicoComponent,
    CapacitacionesComponent,
    CapacitacionFormacionComponent,
    VentaComputadorasComponent,
    SoporteEquiposComponent,
    ActivateAccountComponent,
    MensajesComponent,
    VentaDetallesComponent,
    SubirarchivosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
