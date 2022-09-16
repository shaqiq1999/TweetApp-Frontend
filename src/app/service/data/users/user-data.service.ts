import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

export class Users {
  constructor(public FirstName: string, public LastName: string, public Email: string, public userName: string, public password: string,public securityKey:string, public ContactNumber: string) { }
}

export class LogIn {
  constructor(public userName: string,  public password: string) { }
}
export class ForgotKey {
  constructor(public userName: string,  public NewPassword: string, public SecurityKey: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  register(user: Users) {
    
    return this.http.post(baseUrl+"/api/v1/tweets/register", user)
  }

  getAllUsers() {
    return this.http.get<Users[]>(baseUrl+"/api/v1/tweets/users/all")
  }

  getUser(userName: String) {
    return this.http.get<Users[]>(baseUrl+`/api/v1/tweets/user/search/${userName}`)
  }
  forgot(userName: String, forgotKey:ForgotKey) {
    return this.http.post(baseUrl+`/api/v1/tweets/${userName}/forgot`,forgotKey,{
      observe:'body',responseType:'text'as 'json'
    })
  }

 
  searchByRegex(str : string){
    return this.http.get<Users[]>(baseUrl+`/api/v1/tweets/user/search/${str}`)
  }
  authenticateUser(loginn:LogIn){
    
    
    return this.http.post(baseUrl+`/api/v1/tweets/login`,loginn)
  }
}
