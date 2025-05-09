import { Component } from '@angular/core';
import { TemaService } from '../../../../services/tema.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tema-create',
  templateUrl: './tema-create.component.html',
  styleUrls: ['./tema-create.component.css']
})
export class TemaCreateComponent {
  nombre = '';
  descripcion = '';
  mensaje = '';

  constructor(private temaService: TemaService, private router: Router) {}

  guardar(): void {
    if (!this.nombre.trim()) return;

  this.temaService.insertarTema({
  nombre: this.nombre,
  descripcion: this.descripcion
}).subscribe({
  next: () => {
    this.mensaje = '✅ Tema creado correctamente';
    this.nombre = '';
    this.descripcion = '';
  },
  error: (err) => {
    if (err.status === 200 || err.status === 201) {
      // La API lo trató como error, pero realmente lo insertó
      this.mensaje = '✅ Tema creado correctamente (respuesta inesperada)';
      this.nombre = '';
      this.descripcion = '';
    } else {
      this.mensaje = '❌ Error al crear tema';
      console.error('Error real:', err);
    }
  }
});

  }
}
