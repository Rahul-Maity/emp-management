import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent  {
  faTrash = faTrash;
  employees: Employee[] = [];
  employeeForm!: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.employeeForm = this.fb.group({
      employeeId: [''],
      name: [''],
      contactNumber: [''],
      email: [''],
      skills: this.fb.array([
          this.fb.group({
              skillName: [''],
              experience: ['']
          })
      ]),
      gender: [''] // Assuming gender is a single value, not an array
  });
  }


  get skillForms() {
    return this.employeeForm.get('skills') as FormArray;
  }
  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  addSkill() {
    this.skillForms.push(this.createSkillFormGroup());
    console.log(this.skillForms.length );
  }
 
  removeSkill(index: number) {
    this.skillForms.removeAt(index);
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = { 
        employeeId: this.employeeForm.value.employeeId,
        name: this.employeeForm.value.name,
        contactNumber: this.employeeForm.value.contactNumber,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        skills: this.employeeForm.value.skills
      };
      this.employeeService.employees.push(newEmployee);
     
      this.employeeForm.reset();
      this.router.navigate(['/']);
    }
   
  }
 
}
