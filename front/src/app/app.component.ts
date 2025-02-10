import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.verificarConexion();
    
  }

  verificarConexion(): void {
    this.http.get('http://localhost:3000/ping', { responseType: 'text' })
      .subscribe(
        response => console.log('Conexión exitosa al backend:', response),
        error => console.error('Error de conexión con el backend:', error)
      );
  }
}
