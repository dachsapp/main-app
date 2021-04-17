import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapscreenComponent } from './mapscreen.component';

describe('MapscreenComponent', () => {
  let component: MapscreenComponent;
  let fixture: ComponentFixture<MapscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
