import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitoFormModalComponent } from './hito-form-modal.component';

describe('HitoFormModalComponent', () => {
  let component: HitoFormModalComponent;
  let fixture: ComponentFixture<HitoFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HitoFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
