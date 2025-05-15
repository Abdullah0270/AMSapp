import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShiftService } from '../../services/shift.service';
import { ShiftResponse } from '../../model/shifts';

@Component({
  selector: 'app-shift',
  templateUrl: './shifts.component.html',
})
export class ShiftsComponent implements OnInit {
  shiftForm!: FormGroup;
  shifts: ShiftResponse[] = [];
  editingShiftId: string | null = null;

  constructor(private fb: FormBuilder, private shiftService: ShiftService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadShifts();
  }

  initializeForm(): void {
    this.shiftForm = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  // loadShifts(): void {
  //   this.shiftService.getAll().subscribe((data) => {
  //     this.shifts = data;
  //   });
  // }
  loadShifts(): void {
    this.shiftService.getAll().subscribe((data) => {
      this.shifts = data.map(shift => ({
        globalId: shift.globalId,
        name: shift.name,
        startTime: typeof shift.startTime === 'string' 
          ? this.convertTimeSpanToDate(shift.startTime) 
          : shift.startTime,
        endTime: typeof shift.endTime === 'string' 
          ? this.convertTimeSpanToDate(shift.endTime) 
          : shift.endTime
      }));
      
    });
  }
  
  convertTimeSpanToDate(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds || 0);
    date.setSeconds(0); // if needed, reset to clean
    return date;
  }
  

  onSubmit(): void {
    const shiftData: ShiftResponse = this.shiftForm.value;

    if (this.editingShiftId) {
      this.shiftService.update(this.editingShiftId, shiftData).subscribe(() => {
        this.resetForm();
        this.loadShifts();
      });
    } else {
      this.shiftService.create(shiftData).subscribe((createdShift) => {
        const createdGlobalId = createdShift.globalId;
        console.log('✅ Created Shift GlobalId:', createdGlobalId); // You can use this variable as needed
        this.resetForm();
        this.loadShifts();
      });
    }
  }

  editShift(shift: ShiftResponse): void {
    this.shiftForm.patchValue({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
    });
    this.editingShiftId = shift.globalId;
  }

  deleteShift(globalId: string): void {
    if (confirm('Are you sure you want to delete this shift?')) {
      this.shiftService.delete(globalId).subscribe(() => this.loadShifts());
    }
  }

  resetForm(): void {
    this.shiftForm.reset();
    this.editingShiftId = null;
  }
}
