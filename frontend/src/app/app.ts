import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibroCrudComponent } from './components/libro-crud/libro-crud';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LibroCrudComponent], // <-- Importamos nuestro componente
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}