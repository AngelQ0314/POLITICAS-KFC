import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../services/restaurante.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PoliticaRestaurante {
  Coleccion_Restaurante: string;
  Parametro_Restaurante: string;
  Varchar_Valor_Restaurante_BD: string;
  Varchar_Valor_Restaurante_Desarrollo: string;
  Varchar_Validacion_Coincidencia: string;
  editando?: boolean;
}

@Component({
  selector: 'app-restaurante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})
export class RestauranteComponent implements OnInit {
  vistaActual: string = '';
  politicas: any[] = [];
  politicasValidacion: any[] = [];
  mensajeValidacion: string = '';
  nuevaPolitica = { Coleccion_Restaurante: '', Parametro_Restaurante: '', Valor_Desarrollo: '' };
  editando = false;
  idEditando: number | null = null;

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.obtenerPoliticas();
  }

  // Obtener todas las políticas de restaurante
  obtenerPoliticas(): void {
    this.restauranteService.obtenerPoliticas().subscribe(
      response => this.politicas = response,
      error => console.error('Error al cargar políticas:', error)
    );
  }

  //Insertar una nueva política
  insertarPolitica(): void {
    if (this.nuevaPolitica.Coleccion_Restaurante && this.nuevaPolitica.Parametro_Restaurante && this.nuevaPolitica.Valor_Desarrollo) {
      this.restauranteService.insertarPolitica(this.nuevaPolitica).subscribe(
        () => {
          this.obtenerPoliticas();
          this.nuevaPolitica = { Coleccion_Restaurante: '', Parametro_Restaurante: '', Valor_Desarrollo: '' };
        },
        error => console.error('Error al insertar política:', error)
      );
    }
  }

  //Editar política
  iniciarEdicion(politica: any): void {
    this.editando = true;
    this.idEditando = politica.id;
    this.nuevaPolitica = { ...politica };
  }

  guardarEdicion(): void {
    if (this.idEditando !== null) {
      this.restauranteService.editarPolitica(this.idEditando, this.nuevaPolitica).subscribe(
        () => {
          this.obtenerPoliticas();
          this.cancelarEdicion();
        },
        error => console.error('Error al editar política:', error)
      );
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.nuevaPolitica = { Coleccion_Restaurante: '', Parametro_Restaurante: '', Valor_Desarrollo: '' };
  }

  //Eliminar política
  eliminarPolitica(id: number): void {
    this.restauranteService.eliminarPolitica(id).subscribe(
      () => this.obtenerPoliticas(),
      error => console.error('Error al eliminar política:', error)
    );
  }

  //Validar políticas
  validarPoliticas(): void {
    this.restauranteService.validarPoliticas().subscribe(
      response => {
        console.log('🔍 Respuesta del backend:', response);

        if (!Array.isArray(response.resultados)) {
          console.error('Error: `resultados` no es un array', response.resultados);
          return;
        }
        this.politicasValidacion = response.resultados.map((politica: PoliticaRestaurante) => ({
          ...politica,
          editando: false
        }));

        this.mensajeValidacion = response.mensaje;
      },
      error => console.error('Error al validar políticas:', error)
    );
  }

  //Activar edición solo en el valor en BD
  activarEdicion(politica: any): void {
    politica.editando = true;
  }

  //Guardar corrección en la base de datos
  guardarCorreccion(politica: any): void {
    const coleccion = politica.Coleccion_Restaurante;
    const parametro = politica.Parametro_Restaurante;
    const nuevoValor = politica.Varchar_Valor_Restaurante_BD;

    this.restauranteService.corregirPolitica(coleccion, parametro, nuevoValor)
      .subscribe(
        () => {
          politica.editando = false;
          alert('Política corregida correctamente.');
          this.validarPoliticas();
        },
        error => console.error('Error al corregir política:', error)
      );
  }

  mostrarVista(vista: string): void {
    this.vistaActual = vista;
  }
}
