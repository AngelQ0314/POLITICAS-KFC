import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosEntradaService {
  private apiUrl = 'http://localhost:3000/datos-entrada';

  constructor(private http: HttpClient) { }

  //Obtener los datos de entrada
  obtenerDatosEntrada(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  //Insertar datos correctamente en el JSON
  insertarDatos(datosActualizados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, datosActualizados);
  }

  //Eliminar una clave específica
  eliminarDato(clave: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${clave}`);
  }
}
