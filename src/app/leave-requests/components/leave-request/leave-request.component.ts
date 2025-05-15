import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DatePipe } from '@angular/common';  // Import DatePipe

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  providers: [DatePipe]  // Add DatePipe as a provider
})
export class LeaveRequestComponent {
  form: FormGroup;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private service: LeaveRequestService,
    private authService: AuthService,
    private datePipe: DatePipe  // Inject DatePipe
  ) {
    this.form = this.fb.group({
      startDate: [''],
      endDate: [''],
      reason: ['']
    });
  }

  ngOnInit(): void {
    this.employeeId = this.authService.getid(); // Get the employee ID from AuthService
  }

  submit() {
    if (this.employeeId) {
      const leaveRequest = {
        employeeId: Number(this.employeeId),  // ✅ convert to number
        startDate: new Date(this.form.value.startDate).toISOString(),  // ✅ UTC ISO format with 'Z'
        endDate: new Date(this.form.value.endDate).toISOString(),
        reason: this.form.value.reason
      };
  
      this.service.submitRequest(leaveRequest).subscribe({
        next: () => alert('Leave request submitted.'),
        error: (err) => {
          console.error(err);
          alert('Failed to submit leave request.');
        }
      });
    } else {
      alert('Employee ID not found!');
    }
  }
  
}
