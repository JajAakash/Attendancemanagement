import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { Employee } from './registration/employee';
import { Login } from './login/login';
import { Data } from './profile/data';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  empId:number;
  flag=true;
  empdetails:any;
  empCode:any;

  constructor(private router:Router, private http:HttpClient) { }

  
  registeration(data:Employee):Observable<any>{

    return this.http.post("http://localhost:2200/signup",data);
  }

  login(data:Login):Observable<any>{

    this.empId=data.employeeId;
    
    return this.http.post("http://localhost:2200/login",data);
     
  }

  details():Observable<any>{
    return this.http.get("http://localhost:2200/employeedata/"+this.empId);
  }

  logOut():Observable<any>{

    return this.http.post("http://localhost:3333/logout/"+this.empId,this.empId)
  }

  updateEmployeeAttendance(data:Data):Observable<any>{
    return this.http.put("http://localhost:3333/update/attendance/"+this.empId,data)
  }

  removeEmployee():Observable<any>{
    return this.http.delete("http://localhost:2200/remove/"+this.empId)
  }

  removeAttendancee():Observable<any>{
    return this.http.delete("http://localhost:3333/remove/"+this.empId+"/attendance")

  }
  updateEmployee(data:Employee):Observable<any>{
    return this.http.put("http://localhost:2200/update/"+this.empId,data)
  }
}
