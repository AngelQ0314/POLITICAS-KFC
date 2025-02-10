import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstacionService } from '../services/estacion.service';

interface PoliticaEstacion {
  Estacion: string
  Coleccion_Estacion: string;
  Parametro_Estacion: string;
  Varchar_Valor_Estacion_BD: string;
  Varchar_Valor_Estacion_Desarrollo: string;
  Varchar_Validacion_Coincidencia: string;
  editando?: boolean;
}


@Component({
  selector: 'app-estacion',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './estacion.component.html',
  styleUrl: './estacion.component.scss'
})
export class EstacionComponent implements OnInit {
  vistaActual: string = '';
  politicas: any[] = [];
  politicasValidacion: any[] = [];
  mensajeValidacion: string = '';
  nuevaPolitica = { Estacion: '', Coleccion_Estacion: '', Parametro_Estacion: '', Valor_Desarrollo: '' };
  editando = false;
  idEditando: number | null = null;

  constructor(private estacionService: EstacionService) { }

  ngOnInit(): void {
    this.obtenerPoliticas();
  }

  // Obtener todas las políticas de estacion
  obtenerPoliticas(): void {
    this.estacionService.obtenerPoliticas().subscribe(
      response => this.politicas = response,
      error => console.error('Error al cargar políticas:', error)
    );
  }


  //Insertar una nueva política
  insertarPolitica(): void {
    if (this.nuevaPolitica.Estacion && this.nuevaPolitica.Coleccion_Estacion && this.nuevaPolitica.Parametro_Estacion && this.nuevaPolitica.Valor_Desarrollo) {
      this.estacionService.insertarPolitica(this.nuevaPolitica).subscribe(
        () => {
          this.obtenerPoliticas();
          this.nuevaPolitica = { Estacion: '', Coleccion_Estacion: '', Parametro_Estacion: '', Valor_Desarrollo: '' };
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
      this.estacionService.editarPolitica(this.idEditando, this.nuevaPolitica).subscribe(
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
    this.nuevaPolitica = { Estacion: '', Coleccion_Estacion: '', Parametro_Estacion: '', Valor_Desarrollo: '' };
  }

  //Eliminar política
  eliminarPolitica(id: number): void {
    this.estacionService.eliminarPolitica(id).subscribe(
      () => this.obtenerPoliticas(),
      error => console.error('Error al eliminar política:', error)
    );
  }

  //Validar políticas
  validarPoliticas(): void {
    this.estacionService.validarPoliticas().subscribe(
      response => {
        console.log('🔍 Respuesta del backend:', response);

        if (!Array.isArray(response.resultados)) {
          console.error('Error: `resultados` no es un array', response.resultados);
          return;
        }
        this.politicasValidacion = response.resultados.map((politica: PoliticaEstacion) => ({
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
      const estacion = politica.Estacion;
      const coleccion = politica.Coleccion_Estacion;
      const parametro = politica.Parametro_Estacion;
      const nuevoValor = politica.Varchar_Valor_Estacion_BD;
  
      this.estacionService.corregirPolitica(estacion,coleccion, parametro, nuevoValor)
        .subscribe(
          () => {
            politica.editando = false;
            alert('Política corregida correctamente.');
            this.validarPoliticas();
          },
          error => console.error('Error al corregir política:', error)
        );
    }
}
