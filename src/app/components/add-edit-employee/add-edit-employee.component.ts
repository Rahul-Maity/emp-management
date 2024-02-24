import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent {
  employeeForm: FormGroup = new FormGroup({
    employeeId: new FormControl('',[Validators.required,Validators.minLength(2)]),
    name: new FormControl('',[Validators.required,Validators.minLength(2)]),
    contactNo: new FormControl(''),
    email: new FormControl(''),
    skillName: new FormControl(''),
    skillExperience: new FormControl(''),
    gender:new FormControl('')
    
  })
}
