import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLocationNotSupportedComponent } from './geo-location-not-supported.component';

describe('GeoLocationNotSupportedComponent', () => {
  let component: GeoLocationNotSupportedComponent;
  let fixture: ComponentFixture<GeoLocationNotSupportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoLocationNotSupportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoLocationNotSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
