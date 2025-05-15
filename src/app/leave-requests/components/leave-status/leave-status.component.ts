import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
})
export class LeaveStatusComponent implements OnInit {
  myRequests: any[] = [];
  loading = true;
  employeeId: string | null = null; // Variable to store the employee ID

  constructor(
    private service: LeaveRequestService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Get the employee ID from AuthService
    this.employeeId = this.authService.getid();

    if (this.employeeId) {
      this.service.getMyRequests(this.employeeId).subscribe({
        next: data => {
          this.myRequests = data;
          this.loading = false;
        },
        error: err => {
          console.error('Failed to load leave requests', err);
          this.loading = false;
        }
      });
    } else {
      console.error('Employee ID not found!');
      this.loading = false;
    }
  }
}
