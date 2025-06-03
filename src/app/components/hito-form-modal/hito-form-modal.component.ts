import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hito-form-modal',
  templateUrl: './hito-form-modal.component.html',
  styleUrls: ['./hito-form-modal.component.css']
})
export class HitoFormModalComponent implements OnInit {
  @Input() objetivoId!: number;
  @Input() temaId!: number;
  @Input() objetivoNombre!: string;
  @Output() hitoCreado = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  hitoForm!: FormGroup;
  apiUrl = 'https://servicio-web-academico.onrender.com/api/hitos';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

 ngOnInit(): void {
    this.hitoForm = this.fb.group({
      nombreObjetivo: [{ value: this.objetivoNombre, disabled: true }, Validators.required],
      temaId: [this.temaId || null, Validators.required],
      descripcion: ['', Validators.required],
      calificacion: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      subtemas: this.fb.array([
        this.crearSubtema()
      ])
    });

    // Si quieres que se llenen automáticamente:
    if (this.objetivoId) {
      this.hitoForm.patchValue({ nombreObjetivo: this.objetivoId });
    }
    if (this.temaId) {
      this.hitoForm.patchValue({ temaId: this.temaId });
    }
  }
  

  get subtemas(): FormArray {
    return this.hitoForm.get('subtemas') as FormArray;
  }

  crearSubtema(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      recursoUrl: ['', [Validators.required]]
    });
  }

  agregarSubtema(): void {
    this.subtemas.push(this.crearSubtema());
  }

  eliminarSubtema(index: number): void {
    if (this.subtemas.length > 1) {
      this.subtemas.removeAt(index);
    }
  }

  guardarHito(): void {
    if (this.hitoForm.invalid) return;

    // Emitir el hito al padre, no hacer POST
    const hito = {
      descripcion: this.hitoForm.value.descripcion,
      calificacion: this.hitoForm.value.calificacion,
      objetivoId: this.objetivoId || 0,
      temaId: this.temaId || 0,
      subtemas: this.hitoForm.value.subtemas
    };

    this.hitoCreado.emit(hito);
    this.hitoForm.reset();
    this.subtemas.clear();
    this.agregarSubtema();
    this.cancelar.emit(); // Cierra el modal automáticamente
  }
}
