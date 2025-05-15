export interface AttendanceLogRequest {
    globalId?: string;
    employeeId?: number;
    clockIn?: Date;
    clockOut?: Date;
    status?: string;
  }
   
  export interface AttendanceLogResponse {
    id: number;
    employeeId  : number;
    employeefullName: string;
    clockIn: Date;
    clockOut: Date;
    status: string;
    createdOn: Date;
    updatedOn?: Date;
  }

  
  