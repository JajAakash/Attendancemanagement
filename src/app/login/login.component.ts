import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { RegistrationService } from '../registration.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  details:any;
  successMsg: boolean;
  errorMsg: string;
  loginForm: FormGroup;
  constructor(private toastr:ToastrService, private formBuilder: FormBuilder, private router: Router, private registerService:RegistrationService) { }
  async login(){

    this.successMsg=await this.registerService.login(this.loginForm.value).toPromise();
    if(this.successMsg){
      this.registerService.empCode=this.loginForm.value.employeeId;
      this.details=await this.registerService.details().toPromise();
      this.registerService.empdetails=this.details;
      if(this.registerService.empdetails!=null){
        this.router.navigate(['/profile']);  
      }
      
    }
    else{
      this.toastr.error("Kindly REGISTER or login with correct Credential!!" , "AUTHORIZATION FAIL");
    }
  }
  navigate(){
    this.router.navigate(['/register'])
  }
  ngOnInit() {

    this.loginForm=this.formBuilder.group({
      employeeId:['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }

}
