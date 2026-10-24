import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Libro, LibroService } from '../../services/libro.service'; // Asegúrate que la ruta coincida con tu archivo

@Component({
  selector: 'app-libro-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-crud.component.html',
  styleUrls: ['./libro-crud.component.css']
})
export class LibroCrudComponent implements OnInit {
  libros: Libro[] = [];
  libroForm: FormGroup;
  editingId: number | null = null;

  constructor(private fb: FormBuilder, private libroService: LibroService) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: [''],
      anio_publicacion: [null]
    });
  }

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  onSubmit(): void {
    if (this.libroForm.invalid) return;
    const libroData: Libro = this.libroForm.value;

    if (this.editingId) {
      this.libroService.updateLibro(this.editingId, libroData).subscribe(() => {
        this.loadLibros();
        this.resetForm();
      });
    } else {
      this.libroService.createLibro(libroData).subscribe(() => {
        this.loadLibros();
        this.resetForm();
      });
    }
  }

  editLibro(libro: Libro): void {
    this.editingId = libro.id!;
    this.libroForm.patchValue({
      titulo: libro.titulo,
      autor: libro.autor,
      genero: libro.genero,
      anio_publicacion: libro.anio_publicacion
    });
  }

  deleteLibro(id: number): void {
    if (confirm('¿Eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe(() => this.loadLibros());
    }
  }

  resetForm(): void {
    this.libroForm.reset();
    this.editingId = null;
  }
}