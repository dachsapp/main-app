import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGeneratePasswordComponent } from './menu-generate-password.component';

describe('MenuGeneratePasswordComponent', () => {
  let component: MenuGeneratePasswordComponent;
  let fixture: ComponentFixture<MenuGeneratePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGeneratePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGeneratePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
