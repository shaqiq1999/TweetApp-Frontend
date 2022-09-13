import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth/authentication.service';
import { LogIn, UserDataService } from '../service/data/users/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LogIn[] = []

  userName = ''
  password = ''


  errorMessage = ''
  invalidLogin = false

  constructor(private router: Router, private autheneticationService: AuthenticationService, private service: UserDataService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.service.authenticateUser(new LogIn(this.userName, this.password)).subscribe(response => {

      if (response === true) {
        
        localStorage.setItem('authenticatedUser', this.userName)
        this.router.navigate(['tweets', this.userName, 'home'])
        this.invalidLogin = false
      }
      else {
        this.invalidLogin = true
      }

    },
      error => {
        this.invalidLogin = true
        this.errorMessage = 'Invalid Credentials'
      })

  }

}
