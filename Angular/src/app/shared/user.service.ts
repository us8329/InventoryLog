import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {User} from './user.model'

//decorator
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    // username : '',
    email:'',
    password:'',
    confirmpassword:''
  }

  constructor(private http:HttpClient) { }

  postUser(user:User){
    return this.http.post(environment.apiBaseUri+'/register',user)
  }

  login(authCredentials: any){
    return this.http.post(environment.apiBaseUri+'/authenticate' , authCredentials);
  }
}
