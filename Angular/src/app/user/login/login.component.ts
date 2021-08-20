import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService:UserService, private router:Router) { }

  model ={
    email : '',
    password : ''
  };

  emailRegex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  serverErrorMessage :string | undefined;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      res =>{
        // this.userService.setToken( res['token'] );
        this.router.navigateByUrl('/dashboard')
      },err=>{
        this.serverErrorMessage = err.error.message;
        
      }
    );
  }
}
