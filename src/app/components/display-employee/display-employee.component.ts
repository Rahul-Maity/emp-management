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
  faEdit = faEdit;
  faTrash = faTrash;
  employee: Employee[] = [];
  constructor(private employeeService: EmployeeService,private router:Router) {
    
  }
  ngOnInit(): void {
    this.employee = this.employeeService.employees;
  }
  addEmployee() {
    this.router.navigate(['/add-edit'])
  }

  deleteEmployee(index: number) {
    const employeeName = this.employee[index].name;
    const confirmation = confirm(`Are you sure want to delete ${employeeName}?`);
    if (confirmation) {
      this.employee.splice(index, 1);
      this.showSuccessMessage(`The Employee ${employeeName} is deleted successfully.`);
    }
  }
  showSuccessMessage(message: string) {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
      successElement.innerText = message;
      const messageWidth = message.length * 8;
      successElement.style.width = `${messageWidth}px`;
      successElement.style.display = 'block';
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 2000);
    }
   

  }
}
