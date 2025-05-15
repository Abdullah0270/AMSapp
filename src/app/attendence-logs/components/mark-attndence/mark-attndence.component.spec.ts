import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkAttendanceComponent } from './mark-attndence.component';


describe('MarkAttndenceComponent', () => {
  let component: MarkAttendanceComponent;
  let fixture: ComponentFixture<MarkAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkAttendanceComponent]
    });
    fixture = TestBed.createComponent(MarkAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
