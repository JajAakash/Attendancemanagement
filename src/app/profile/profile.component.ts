import { Component, OnInit } from '@angular/core';
import { Router} from '../../../node_modules/@angular/router';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { RegistrationService } from '../registration.service';
import { Data } from './data';
import { saveAs } from 'file-saver';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  empDetails:Data[]=[];
  detail:any;
  id:any;
  updateattendanceForm:FormGroup;
  constructor(private toastr:ToastrService,private formBuilder: FormBuilder, private router: Router, private registerService:RegistrationService) { }

  async details(){
     this.empDetails=await this.registerService.details().toPromise();
  }
  logout(){
  
    this.id=this.registerService.logOut().toPromise();
    if(this.id!=null){
      this.router.navigate(['/login'])
    }
    }

  updateEmployee(){
    this.registerService.updateEmployeeAttendance(this.updateattendanceForm.value).toPromise();
  }

  removeEmployee(){
    this.registerService.removeEmployee().toPromise();
    this.toastr.success("Employee data removed succesfully!!!!")
    this.router.navigate(['/login'])
  }

  removeEmployeeAttendance(){
    this.registerService.removeAttendancee().toPromise();
    this.toastr.success("Employee attendance data removed succesfully!!!!")
    this.router.navigate(['/login'])
  }

  update(){
    this.router.navigate(['update/employee']);
  }

  downloadTable(){
    var data = document.getElementById('attendance-table');
    var blob = new Blob([data.innerText],{
      type: "text/plain;charset=utf-8"})
      saveAs(blob,"attendance-record.txt");
    this.downloadEmployee();
  }
  downloadEmployee(){
    var data = document.getElementById('emp');
    var blob = new Blob([data.innerText],{
      type: "text/plain;charset=utf-8"})
      saveAs(blob,"employee.txt");
  }

  
  ngOnInit() {
    this.details();
    this.updateattendanceForm=this.formBuilder.group({
      date:['',[Validators.required]],
      availabilty: ['', [Validators.required]]
    })
  }

}
