import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class DatosEntradaService {
  private filePath = join(__dirname, '..', '..', 'assets', 'datos_entrada.json');

  constructor() {
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, JSON.stringify({}, null, 2), 'utf8');
    }
  }

  // Leer datos del archivo JSON
  private leerArchivo(): any {
    try {
      const fileContent = readFileSync(this.filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error al leer el JSON:', error.message);
      return {};
    }
  }

  // Escribir datos en el archivo JSON
  private escribirArchivo(datos: any): void {
    try {
      writeFileSync(this.filePath, JSON.stringify(datos, null, 2), 'utf8');
      console.log('Archivo JSON actualizado correctamente.');
    } catch (error) {
      console.error('Error al escribir el JSON:', error.message);
    }
  }

  // Obtener datos de entrada si aún no han expirado
  obtenerDatosEntrada(): any {
    const datos = this.leerArchivo();
    if (Object.keys(datos).length === 0) {
      throw new NotFoundException('No hay datos disponibles.');
    }
    return datos;
  }

  // Insertar o actualizar datos de entrada
  insertarDatos(datos: any): any {
    this.escribirArchivo(datos);
    console.log('Datos guardados correctamente.');
    return { mensaje: 'Datos de entrada guardados correctamente.', datos };
  }

  // Editar un campo específico dentro del JSON sin afectar el formato
  editarDato(clave: string, valor: string): any {
    const datos = this.leerArchivo();
    if (!(clave in datos)) {
      throw new NotFoundException(`La clave "${clave}" no existe.`);
    }

    datos[clave] = valor;
    this.escribirArchivo(datos);

    console.log(`Clave "${clave}" editada correctamente.`);
    return { mensaje: `Clave "${clave}" editada correctamente.`, datos };
  }

  // Eliminar una clave específica
  eliminarDato(clave: string): any {
    const datos = this.leerArchivo();
    if (!(clave in datos)) {
      throw new NotFoundException(`La clave "${clave}" no existe.`);
    }

    delete datos[clave];
    this.escribirArchivo(datos);

    console.log(`Clave "${clave}" eliminada correctamente.`);
    return { mensaje: `Clave "${clave}" eliminada correctamente.` };
  }
}
