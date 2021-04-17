import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktiereUnsComponent } from './kontaktiere-uns.component';

describe('KontaktiereUnsComponent', () => {
  let component: KontaktiereUnsComponent;
  let fixture: ComponentFixture<KontaktiereUnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontaktiereUnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontaktiereUnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
