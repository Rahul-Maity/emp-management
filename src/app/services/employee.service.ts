import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [];
  constructor() { }




  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  updateEmployee(employeeId: string, updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.employeeId === employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }
  getEmployeeById(employeeId: string): Employee | undefined{
    return this.employees.find(emp => emp.employeeId === employeeId);
  }
}
