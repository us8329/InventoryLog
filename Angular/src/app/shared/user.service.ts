import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {User} from './user.model'
import { of ,Observable} from 'rxjs';
import { pipe } from 'rxjs';
import { Token } from './token.model';
import {map , catchError, mapTo} from 'rxjs/operators' ;
import { tap } from 'rxjs/operators'
// import { mapTo } from 'rxjs/operators';

//decorator
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser :string;
  selectedUser: User = {
    // username : '',
    email:'',
    password:'',
    confirmpassword:''
  }

  constructor(private http:HttpClient) { }

  tokens : Token ;
  postUser(user:User){
    return this.http.post(environment.apiBaseUri+'/register',user)
}


  login(authCredentials: any){
    return this.http.post(environment.apiBaseUri+'/authenticate' , authCredentials)
    .pipe(
      map((response : Token)=>{
        const token = response as Token;
        if(token){
          localStorage.setItem(this.JWT_TOKEN, JSON.stringify(token.jwt))
        }
      })
    )
  }
  getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN)
  }
  isLoggedIn() {
    return !!this.getJwtToken();
  }
  logout(){
    // localStorage.setItem(this.JWT_TOKEN ,null)
    localStorage.clear();
    return true;
  }

}
