import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit  {
  faTrash = faTrash;
  employees: Employee[] = [];
  employeeForm!: FormGroup;
  isEdit: boolean = false;
  employeeId: string = '';
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router,private route:ActivatedRoute) {
      // Initialize the form with FormBuilder
    this.employeeForm = this.fb.group({
      employeeId: [''],
      name: [''],
      contactNumber: [''],
      email: [''],
       // Form array for skills
      skills: this.fb.array([
          this.fb.group({
              skillName: [''],
              experience: ['']
          })
      ]),
      gender: [''] // Assuming gender is a single value, not an array
  });
  }
  ngOnInit(): void {
     // Subscribe to route params for editing an employee
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.employeeId = params['id'];
         // Fetch the employee by ID
        const employee = this.employeeService.getEmployeeById(this.employeeId);
        if (employee) {
           // Populate the form with employee data
          this.populateForm(employee);
        }
        else {
          console.log('employee not found');
        }
      }
    });
  }
   // Populate form with employee data
  populateForm(employee: Employee) {
    this.employeeForm.patchValue({
      employeeId: employee.employeeId,
      name: employee.name,
      contactNumber: employee.contactNumber,
      email: employee.email,
      gender: employee.gender
    });
    this.employeeForm.setControl('skills', this.fb.array([]));
    // Loop through employee skills and add them to the form
    employee.skills.forEach(skill => {
      this.skillForms.push(this.fb.group({
        skillName: skill.skillName,
        experience: skill.experience
      }));
    });
  }

// Getter for accessing skill form array
  get skillForms() {
    return this.employeeForm.get('skills') as FormArray;
  }
   // Create a form group for a skill
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
    // Submit the form
  onSubmit() {
    if (this.employeeForm.valid) {
       // Create a new Employee object with form data
      const newEmployee: Employee = { 
        employeeId: this.employeeForm.value.employeeId,
        name: this.employeeForm.value.name,
        contactNumber: this.employeeForm.value.contactNumber,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        skills: this.employeeForm.value.skills
      };
        // Check if editing an existing employee or adding a new one
      if (this.isEdit && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, newEmployee);
      }
      else {
        this.employeeService.addEmployee(newEmployee);
      }
  // Reset the form after submission
      this.employeeForm.reset();
      this.router.navigate(['/']);
    }
   
  }
 
}
