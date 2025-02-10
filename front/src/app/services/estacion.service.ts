import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EstacionService {
    private apiUrl = 'http://localhost:3000/estacion/politicas';

    constructor(private http: HttpClient) { }

    //Obtener todas las políticas de estacion
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
    corregirPolitica(estacion:string, coleccion: string, parametro: string, nuevoValor: string) {
        const url = `http://localhost:3000/estacion/politicas/corregir/${encodeURIComponent(estacion)}/${encodeURIComponent(coleccion)}/${encodeURIComponent(parametro)}`;
        return this.http.put(url, { nuevoValor });
      }
}
