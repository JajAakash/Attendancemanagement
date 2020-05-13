import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from './registration.service';
import { ToastrService } from '../../node_modules/ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  
  constructor(private router:Router, private registerService:RegistrationService,private toastr:ToastrService){}

  canActivate():boolean{
    if(this.registerService.empCode==null){
      this.toastr.show("You need to Login First!!")
      return false;
    }
    else{
      return true;
    }
  } 
}
