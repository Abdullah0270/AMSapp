import { Component, OnInit } from '@angular/core';
import { LeaveRequestService } from '../../services/leave-request.service';

@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
})
export class LeaveApproveComponent implements OnInit {
  requests: any[] = [];

  constructor(private service: LeaveRequestService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => this.requests = data);
  }

  updateStatus(id: string, status: string) {
    this.service.updateStatus(id, { status }).subscribe(() => {
      alert('Status updated');
      this.ngOnInit();
    });
  }
  
}
