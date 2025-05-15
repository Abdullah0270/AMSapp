import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttndenceListComponent } from './attndence-list.component';

describe('AttndenceListComponent', () => {
  let component: AttndenceListComponent;
  let fixture: ComponentFixture<AttndenceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttndenceListComponent]
    });
    fixture = TestBed.createComponent(AttndenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
