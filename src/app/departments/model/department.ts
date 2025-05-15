export interface DepartmentRequest {
    globalId?: string;       
    name?: string;           
    description?: string;    
  }
  
export interface DepartmentResponse {
    globalId: string;
    name: string;
    description: string;
  }