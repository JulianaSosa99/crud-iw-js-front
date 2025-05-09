import { Component, OnInit } from '@angular/core';
import { TemaService, Tema } from '../../../../services/tema.service';
import { ObjetivoService } from '../../../../services/objetivo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objetivo-create',
  templateUrl: './objetivo-create.component.html',
  styleUrls: ['./objetivo-create.component.scss']
})
export class ObjetivoCreateComponent implements OnInit {
  titulo = '';
  descripcion = '';
  temaID: number | null = null;
  temas: Tema[] = [];
  nuevoHito = '';
  hitos: string[] = [];

  constructor(
    private temaService: TemaService,
    private objetivoService: ObjetivoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.temaService.obtenerTemas(token).subscribe({
        next: data => this.temas = data,
        error: err => console.error('Error al cargar temas', err)
      });
    }
  }

  agregarHito(): void {
    if (this.nuevoHito.trim()) {
      this.hitos.push(this.nuevoHito.trim());
      this.nuevoHito = '';
    }
  }

  guardar(): void {
    if (!this.temaID || !this.titulo) return;

    this.objetivoService.crearObjetivoConHitos(
      {
        titulo: this.titulo,
        descripcion: this.descripcion,
        temaID: this.temaID
      },
      this.hitos
    ).subscribe({
      next: () => {
        alert('Objetivo creado correctamente 🎯');
        this.router.navigate(['/usuarios/objetivos']);
      },
      error: err => console.error('Error al guardar objetivo', err)
    });
  }
}
