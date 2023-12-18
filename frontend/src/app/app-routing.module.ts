import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './dashboard/inicio/inicio.component';
import { HomeComponent } from './landingpage/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';
import { UsuariosComponent } from './dashboard/menu-lateral/usuarios/usuarios.component';
import { EmpleadosComponent } from './dashboard/menu-lateral/empleados/empleados.component';
import { VentaEquiposComponent } from './dashboard/menu-lateral/venta-equipos/venta-equipos.component';
import { SoporteTecnicoComponent } from './dashboard/menu-lateral/soporte-tecnico/soporte-tecnico.component';
import { CapacitacionesComponent } from './dashboard/menu-lateral/capacitaciones/capacitaciones.component';
import { VentaComputadorasComponent } from './landingpage/servicios/venta-computadoras/venta-computadoras.component';
import { SoporteEquiposComponent } from './landingpage/servicios/soporte-equipos/soporte-equipos.component';
import { CapacitacionFormacionComponent } from './landingpage/servicios/capacitacion-formacion/capacitacion-formacion.component';
import { ActivateAccountComponent } from './authentication/activate-account/activate-account.component';
import { VentaDetallesComponent } from './landingpage/servicios/venta-computadoras/venta-detalles/venta-detalles.component';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "home", component:HomeComponent},
  {path: "login", component:LoginComponent},
  {path: "registro", component:RegisterComponent},
  {path: "olvidopass", component: ForgotPasswordComponent},
  {path: "dashboard", component:InicioComponent},
  {path: "recuperarpass", component:RecoverPasswordComponent},
  {path: "activarcuenta/:email/:codigo", component:ActivateAccountComponent},
  {path: "dashboard/usuarios", component:UsuariosComponent},
  {path: "dashboard/empleados", component:EmpleadosComponent},
  {path: "dashboard/servicios/venta-equipos", component:VentaEquiposComponent},
  {path: "dashboard/servicios/soporte-tecnico", component:SoporteTecnicoComponent},
  {path: "dashboard/servicios/capacitaciones", component:CapacitacionesComponent},
  {path: "servicios/venta-equipos", component:VentaComputadorasComponent},
  {path: "servicios/venta-equipos/venta-detalle/:id/:nombre", component:VentaDetallesComponent},
  {path: "servicios/soporte-tecnico", component:SoporteEquiposComponent},
  {path: "servicios/capacitaciones", component:CapacitacionFormacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
