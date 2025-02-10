import { Component, OnInit } from '@angular/core';
import { DatosEntradaService } from '../services/datos-entrada.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-datos-entrada',
  templateUrl: './datos-entrada.component.html',
  styleUrls: ['./datos-entrada.component.scss']
})
export class DatosEntradaComponent implements OnInit {
  datosEntrada: any = {};
  nuevoDato = { clave: '', valor: '' };
  editandoClave: string | null = null;
  editandoValor: string = '';

  constructor(private datosEntradaService: DatosEntradaService, private router:Router) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  //Cargar los datos de entrada desde el backend
  cargarDatos(): void {
    this.datosEntradaService.obtenerDatosEntrada().subscribe(
      response => this.datosEntrada = response,
      error => console.error('Error al cargar datos:', error)
    );
  }

  //Insertar nuevo dato correctamente
  insertarDatos(): void {
    if (this.nuevoDato.clave && this.nuevoDato.valor) {
      const nuevoDatoObjeto = { ...this.datosEntrada, [this.nuevoDato.clave]: this.nuevoDato.valor };

      this.datosEntradaService.insertarDatos(nuevoDatoObjeto).subscribe(
        () => {
          this.cargarDatos(); //
          this.nuevoDato = { clave: '', valor: '' };
        },
        error => console.error('Error al insertar datos:', error)
      );
    } else {
      console.error('Debes ingresar una clave y un valor.');
    }
  }

  //Preparar edición de un dato
  prepararEdicion(clave: string, valor: string): void {
    this.editandoClave = clave;
    this.editandoValor = valor;
  }

  // Guardar edición del dato
  guardarEdicion(): void {
    if (this.editandoClave) {
      const datosActualizados = { ...this.datosEntrada, [this.editandoClave]: this.editandoValor };

      this.datosEntradaService.insertarDatos(datosActualizados).subscribe(
        () => {
          this.cargarDatos();
          this.cancelarEdicion();
        },
        error => console.error('Error al editar datos:', error)
      );
    }
  }

  // Eliminar un dato
  eliminarDato(clave: string): void {
    this.datosEntradaService.eliminarDato(clave).subscribe(
      () => {
        delete this.datosEntrada[clave];

        if (Object.keys(this.datosEntrada).length === 0) {
          this.datosEntrada = {};
        }
      },
      error => console.error('Error al eliminar dato:', error)
    );
  }

  //Cancelar edición
  cancelarEdicion(): void {
    this.editandoClave = null;
    this.editandoValor = '';
  }

  //Convertir objeto en lista de claves para `*ngFor`
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  continuar(): void {
    this.router.navigate(['/politicas']); 
  }
}
