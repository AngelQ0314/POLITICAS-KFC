import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestauranteService {
    private apiUrl = 'http://localhost:3000/restaurante/politicas';
    constructor(private http: HttpClient) { }

    //Obtener todas las políticas de restaurante
    obtenerPoliticas(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    //Insertar nueva política
    insertarPolitica(politica: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, politica);
    }

    //Editar política existente
    editarPolitica(id: number, politica: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, politica);
    }

    //Eliminar una política por ID
    eliminarPolitica(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    //Validar políticas con la base de datos
    validarPoliticas(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/validar`);
    }

    //Corregir política (actualizar en la base de datos)
    corregirPolitica(coleccion: string, parametro: string, nuevoValor: string) {
        const url = `http://localhost:3000/restaurante/politicas/corregir/${encodeURIComponent(coleccion)}/${encodeURIComponent(parametro)}`;
        return this.http.put(url, { nuevoValor });
      }
      
}
