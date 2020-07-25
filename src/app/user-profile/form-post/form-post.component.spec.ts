import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostComponent } from './form-post.component';

describe('FormPostComponent', () => {
  let component: FormPostComponent;
  let fixture: ComponentFixture<FormPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
