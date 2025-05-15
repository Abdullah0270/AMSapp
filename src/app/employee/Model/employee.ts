export interface EmployeeResponse {
    globalId: string;
    id:string;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    role: string;
    departmentId?: string;
    shiftId?: string;
    faceData?: string | null;
    fingerprintData?: string;
  }
  export interface EmployeeRequest {
    globalId?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password?: string;
    gender: string;
    role: string;
    departmentId?: string;
    shiftId?: string;
    faceData?: string | null;
    fingerprintData?: string;
  }