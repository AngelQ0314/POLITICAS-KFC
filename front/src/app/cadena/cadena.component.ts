import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CadenaService } from '../services/cadena.service';

interface PoliticaCadena {
  Coleccion_Cadena: string;
  Parametro_Cadena: string;
  Varchar_Valor_Cadena_BD: string;
  Varchar_Valor_Cadena_Desarrollo: string;
  Varchar_Validacion_Coincidencia: string;
  editando?: boolean; 
}

@Component({
  selector: 'app-cadena',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './cadena.component.html',
  styleUrl: './cadena.component.scss'
})


export class CadenaComponent implements OnInit {
  vistaActual: string = ''; 
  politicas: any[] = []; 
  resultados: any[] = [];
  mensajeValidacion: string = '';
  politicasValidacion: any[] = [];
  nuevaPolitica = { Coleccion_Cadena: '', Parametro_Cadena: '', Valor_Desarrollo: '' }; 
  editando = false;
  idEditando: number | null = null;

  
  constructor(private cadenaService: CadenaService) { }

  ngOnInit(): void {
    this.obtenerPoliticas();
  }

  //Cargar todas las políticas
  obtenerPoliticas(): void {
    this.cadenaService.obtenerPoliticas().subscribe(
      response => this.politicas = response,
      error => console.error('Error al cargar políticas:', error)
    );
  }

  //Insertar una nueva política
  insertarPolitica(): void {
    if (this.nuevaPolitica.Coleccion_Cadena && this.nuevaPolitica.Parametro_Cadena && this.nuevaPolitica.Valor_Desarrollo) {
      this.cadenaService.insertarPolitica(this.nuevaPolitica).subscribe(
        () => {
          this.obtenerPoliticas();
          this.nuevaPolitica = { Coleccion_Cadena: '', Parametro_Cadena: '', Valor_Desarrollo: '' };
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
      this.cadenaService.editarPolitica(this.idEditando, this.nuevaPolitica).subscribe(
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
    this.nuevaPolitica = { Coleccion_Cadena: '', Parametro_Cadena: '', Valor_Desarrollo: '' };
  }

  //Eliminar política
  eliminarPolitica(id: number): void {
    this.cadenaService.eliminarPolitica(id).subscribe(
      () => this.obtenerPoliticas(),
      error => console.error('Error al eliminar política:', error)
    );
  }

  //Validar políticas
  validarPoliticas(): void {
    this.cadenaService.validarPoliticas().subscribe(
      response => {
        console.log('Respuesta del backend:', response);

        if (!Array.isArray(response.resultados)) {
          console.error('Error: `resultados` no es un array', response.resultados);
          return;
        }
        this.politicasValidacion = response.resultados.map((politica: PoliticaCadena) => ({
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
    const coleccion = politica.Coleccion_Cadena;
    const parametro = politica.Parametro_Cadena;
    const nuevoValor = politica.Varchar_Valor_Cadena_BD;

    this.cadenaService.corregirPolitica(coleccion, parametro, nuevoValor)
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