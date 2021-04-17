import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebersSpielComponent } from './uebers-spiel.component';

describe('UebersSpielComponent', () => {
  let component: UebersSpielComponent;
  let fixture: ComponentFixture<UebersSpielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UebersSpielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UebersSpielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
