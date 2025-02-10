import { Routes } from '@angular/router';
import { DatosEntradaComponent } from './datos-entrada/datos-entrada.component';
import { PoliticasComponent } from './politicas/politicas.component';

export const routes: Routes = [
    {path:'', component: DatosEntradaComponent},
    {path:'politicas', component:PoliticasComponent},
    {path:'**', redirectTo: ''},
    { path: '', redirectTo: 'datos-entrada', pathMatch: 'full' } // Redirección inicial


];
