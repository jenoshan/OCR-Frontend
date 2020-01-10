import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.httpService.logOutUser();
  }

  constructor(private httpService : UserService){
    
  }
  // url = 'http://localhost:8080/users/';
  userData : any = []

  isUserExist = true;

  onLoginSubmit(userFormData : FormData){
    // this.http.get(this.url).subscribe(res=>{
    //   console.log(res);
    // });
    // console.log(userData['email']);
    //if(this.userName==userData['email']&&this.password==userData['password']){
      //this.router.navigateByUrl('home-page');
    //}


    this.httpService.loginUser(userFormData['email'], userFormData['password']);
    
    // .subscribe(res=>{
    //   if(res){
    //     // console.log(res);
    //     this.router.navigateByUrl('home-page/'+res['id']);
    //   }
    // },
    // err=>{
    //   this.isUserExist = false;
    //   // alert('USER NAME OR PASSWORD IS INCORRECT!');
    // });
  }

}
