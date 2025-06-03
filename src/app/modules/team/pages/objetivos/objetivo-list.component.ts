import { Component, OnInit } from '@angular/core';
import { ObjetivoService, ObjetivoResponse, ObjetivoAsignadoResponse } from '../../../../services/objetivo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objetivo-list',
  templateUrl: './objetivo-list.component.html',
  styleUrls: ['./objetivo-list.component.css']
})export class ObjetivoListComponent implements OnInit {
  objetivos: (ObjetivoResponse | ObjetivoAsignadoResponse)[] = [];

  mostrarModal = false;
  objetivoSeleccionadoId!: number;
  temaSeleccionadoId!: number;

  constructor(private objetivoService: ObjetivoService, private router: Router) {}

  ngOnInit(): void {
    this.objetivoService.obtenerObjetivosPorRol().subscribe({
      next: data => this.objetivos = data,
      error: err => console.error('Error al cargar objetivos', err)
    });
  }

  irAFormulario(): void {
    this.router.navigate(['/usuarios/objetivos/crear']);
  }

  esAdmin(obj: any): obj is ObjetivoResponse {
    return 'titulo' in obj;
  }

  abrirModal(objetivoId: number, temaId: number): void {
    this.objetivoSeleccionadoId = objetivoId;
    this.temaSeleccionadoId = temaId;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
