import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAppComponent } from './install-app.component';

describe('InstallAppComponent', () => {
  let component: InstallAppComponent;
  let fixture: ComponentFixture<InstallAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
