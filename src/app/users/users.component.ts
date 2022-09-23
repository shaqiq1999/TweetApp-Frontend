import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService, Users } from '../service/data/users/user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Users[] = []

  user: Users = {
    FirstName: '',
    LastName: '',
    Email: '',
    userName: '',
    password: '',
    ContactNumber: '',
    securityKey: ''
  }



  userName = ''

  str = ''
  searchMessage = ''
  val = false
  noUser = ''

  constructor(private service: UserDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName']

    this.service.getAllUsers().subscribe(response => {
      this.users = response

    })
  }

  search() {
    this.noUser = ''

    if (this.str === '') {
      this.searchMessage = "Please type something before searching"
    }
    else {
      this.searchMessage = ''
      this.service.searchByRegex(this.str).subscribe(data => {
        this.users = data

      // uncommitted



      }, errorData => {
        this.users = errorData

        if (!this.users.length) {
          this.noUser = "No Results for '" + this.str + "'"
          this.service.getAllUsers().subscribe(response => {
            this.users = response

          })
        }

      })
    }

  }
  all() {
    this.service.getAllUsers().subscribe(response => {
      this.users = response
    })
  }

}
