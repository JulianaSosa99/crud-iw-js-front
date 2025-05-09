import { Component, OnInit } from '@angular/core';
import { ObjetivoService, ObjetivoResponse } from '../../../../services/objetivo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objetivo-list',
  templateUrl: './objetivo-list.component.html',
  styleUrls: ['./objetivo-list.component.scss']
})
export class ObjetivoListComponent implements OnInit {
  objetivos: ObjetivoResponse[] = [];

  constructor(private objetivoService: ObjetivoService, private router: Router) {}

  ngOnInit(): void {
    this.objetivoService.obtenerMisObjetivos().subscribe({
      next: data => this.objetivos = data,
      error: err => console.error('Error al cargar objetivos', err)
    });
  }

  irAFormulario(): void {
    this.router.navigate(['/usuarios/objetivos/crear']);
  }
}

