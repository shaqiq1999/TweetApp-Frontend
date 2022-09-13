import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService, Users } from '../service/data/users/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Users[] = []

  FirstName = ''
  LastName = ''
  userName = ''
  password = ''
  confirmPassword = ''
  securityKey = ''
  ContactNumber = ''
  Email = ''

  errorBool = false;

  constructor(private service: UserDataService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    this.service.register(new Users(this.FirstName, this.LastName, this.Email, this.userName, this.password, this.securityKey, this.ContactNumber)).subscribe(
      response => {
        
        this.router.navigate(['tweets/login'])
      },
      error => {
        this.errorBool = true
      }
    )

  }

}
