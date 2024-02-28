import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit{
  // Font Awesome icons for edit and delete actions
  faEdit = faEdit;
  faTrash = faTrash;
  employee: Employee[] = [];
  constructor(private employeeService: EmployeeService,private router:Router) {
    
  }
  ngOnInit(): void {
     // Initialize employee data from the service
    this.employee = this.employeeService.employees;
  }
   // Navigate to the add employee page
  addEmployee() {
    this.router.navigate(['/add-edit'])
  }
   // Navigate to the edit employee page with the employee ID parameter
  editEmployee(employeeId: string) {
    this.router.navigate(['/edit', employeeId]);
  }
   // Delete an employee by index
  deleteEmployee(index: number) {
    const employeeName = this.employee[index].name;
    const confirmation = confirm(`Are you sure want to delete ${employeeName}?`);
    if (confirmation) {
      this.employee.splice(index, 1);
      this.showSuccessMessage(`The Employee ${employeeName} is deleted successfully.`);
    }
  }
  // Show a success message
  showSuccessMessage(message: string) {
      // Get the success message element
    const successElement = document.getElementById('successMessage');
    if (successElement) {
      // Set the message text and adjust the width dynamically
      successElement.innerText = message;
      const messageWidth = message.length * 8;
      successElement.style.width = `${messageWidth}px`;
      successElement.style.display = 'block';
      // Hide the message after 2 seconds
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 2000);
    }
   

  }
}
