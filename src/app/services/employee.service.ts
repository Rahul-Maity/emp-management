import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
   // Array to store employee data
  employees: Employee[] = [];
  constructor() { }

   // Method to add a new employee to the array
  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }
  // Method to update an existing employee in the array
  updateEmployee(employeeId: string, updatedEmployee: Employee) {
    // Find the index of the employee to be updated
    const index = this.employees.findIndex(emp => emp.employeeId === employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }
   // Method to get an employee by their ID
  getEmployeeById(employeeId: string): Employee | undefined{
    return this.employees.find(emp => emp.employeeId === employeeId);
  }
}
