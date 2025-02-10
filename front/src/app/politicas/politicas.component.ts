import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CadenaComponent } from '../cadena/cadena.component';
import { RestauranteComponent } from '../restaurante/restaurante.component';
import { EstacionComponent } from '../estacion/estacion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [CommonModule, CadenaComponent, RestauranteComponent, EstacionComponent], 
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss']
})
export class PoliticasComponent {
  categoriaSeleccionada: string = 'cadena'; 
  constructor(private router: Router) {}

  // Método para cambiar la vista de cada categoría
  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  volverAEntrada() {
    this.router.navigate(['/datos-entrada']);
  }
  
}
