import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotKey, UserDataService, Users } from '../service/data/users/user-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  userName = ''
  newPassword = ''
  c_newPassword = ''
  securityKey=''
  message=''
  errormessage=''

  constructor(private service: UserDataService, private router: Router) { }

  ngOnInit(): void {

  }

  forgotPassword(){
    this.service.forgot(this.userName,new ForgotKey(this.userName,this.newPassword,this.securityKey)).subscribe(response => {
      this.message=response.toString() 
      
      
    },responseError=>{
      this.errormessage=responseError.error
      
    })
    
    
  }

 

 

}
