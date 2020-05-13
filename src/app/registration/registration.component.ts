import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  successMsg: any;
  errorMsg: string;
  registerForm: FormGroup;
  flag=false;
  

  constructor(private toastr:ToastrService,private formBuilder: FormBuilder, private router: Router, private registerService:RegistrationService) { }

  async register(){
    this.successMsg=await this.registerService.registeration(this.registerForm.value).toPromise();
    if(this.successMsg!=null){
      this.registerService.empCode=this.successMsg;
      this.toastr.show("Please not your employee code for login as "+this.successMsg,'Your are registered!!');
      
      this.router.navigate(['/login']);
    }
    }
  

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      emailId:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern("[A-Z]+[a-z0-9-]{7,20}")]],
      dob: ['', [Validators.required]]
      })

  }

}
