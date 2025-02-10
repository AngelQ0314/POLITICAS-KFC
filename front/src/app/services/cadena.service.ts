import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CadenaService {
    private apiUrl = 'http://localhost:3000/cadena/politicas';

    constructor(private http: HttpClient) { }

    // Obtener todas las políticas
    obtenerPoliticas(): Observable<any> {
        return this.http.get(`${this.apiUrl}`);
    }

    // Insertar nueva política
    insertarPolitica(politica: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, politica);
    }

    //Editar política por ID
    editarPolitica(id: number, politica: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, politica);
    }

    //Eliminar política por ID
    eliminarPolitica(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    //Validar políticas en la base de datos
    validarPoliticas(): Observable<any> {
        return this.http.get(`${this.apiUrl}/validar`);
    }

    //Corregir política (actualizar Valor en BD)
    corregirPolitica(coleccion: string, parametro: string, nuevoValor: string): Observable<any> {
        return this.http.put<any>(
            `${this.apiUrl}/corregir/${coleccion}/${parametro}`,
            { Nuevo_Valor: nuevoValor }
        );
    }
}
