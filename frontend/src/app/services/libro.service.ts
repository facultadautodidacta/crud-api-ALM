import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

export interface Libro {
  id?: string;
  titulo: string;
  autor: string;
  genero?: string | null;
  anio_publicacion?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  // Esta ruta /api se redirige a Laravel gracias al proxy
  private apiUrl = '/api/libros'; 

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl).pipe(timeout({ first: 10000 }));
  }

  createLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  updateLibro(id: string, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  deleteLibro(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}