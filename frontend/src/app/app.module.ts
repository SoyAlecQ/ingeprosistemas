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
import { ContenidoUsuariosComponent } from './dashboard/menu-lateral/usuarios/contenido-usuarios/contenido-usuarios.component';
import { CapacitacionFormacionComponent } from './landingpage/servicios/capacitacion-formacion/capacitacion-formacion.component';
import { VentaComputadorasComponent } from './landingpage/servicios/venta-computadoras/venta-computadoras.component';
import { SoporteEquiposComponent } from './landingpage/servicios/soporte-equipos/soporte-equipos.component';
import { ContenidoEmpleadosComponent } from './dashboard/menu-lateral/empleados/contenido-empleados/contenido-empleados.component';

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
    ContenidoUsuariosComponent,
    CapacitacionFormacionComponent,
    VentaComputadorasComponent,
    SoporteEquiposComponent,
    ContenidoEmpleadosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
