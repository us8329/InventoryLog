import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {

  serverErrormessage:string |undefined;
  constructor(public userService:UserService , private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res=>{
        // this.resetForm(form);
        this.router.navigateByUrl('/login')

      },
      err=>{
        if(err.status===422){
          this.serverErrormessage = err.console.error.join('<br/>')
        }else{
          this.serverErrormessage = 'Something went wrong , please contact admin. ';
        }
      });
  }
  resetForm(form:NgForm){
    this.userService.selectedUser={
      // username:'',
      email:'',
      password:'',
      confirmpassword:''
    };
    form.resetForm();
    this.serverErrormessage='';
  }
}
