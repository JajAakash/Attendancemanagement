import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { RegistrationService } from '../registration.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeForm:FormGroup;
  constructor(private toastr:ToastrService,private formBuilder: FormBuilder, private router: Router, private registerService:RegistrationService) { }

  update(){
    this.registerService.updateEmployee(this.employeeForm.value).toPromise()
    this.toastr.success("Employee data successfully updated")
    this.router.navigate(['/login'])
    }
  

  ngOnInit() {

    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password:['', [Validators.required, Validators.pattern("[A-Z]+[a-z0-9-]{7,20}")]],
      dob: ['', [Validators.required]]
      })

  }

  
}
