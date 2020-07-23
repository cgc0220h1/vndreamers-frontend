import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginSignupComponent } from './form-login-signup.component';

describe('FormLoginComponent', () => {
  let component: FormLoginSignupComponent;
  let fixture: ComponentFixture<FormLoginSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoginSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
