import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsFormsComponent } from './departments-forms.component';

describe('DepartmentsFormsComponent', () => {
  let component: DepartmentsFormsComponent;
  let fixture: ComponentFixture<DepartmentsFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentsFormsComponent]
    });
    fixture = TestBed.createComponent(DepartmentsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
