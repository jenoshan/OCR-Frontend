import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  user = {
    user_name: '',
    password: ''
  }
  isUserExist = false;
  isSuccessed = false;

  constructor(private userService: UserService) {

  }

  onRegisterSubmit(userData) {
    this.user.user_name = userData['email'];
    this.user.password = userData['password'];
    if (this.user.user_name && this.user.password) {
      this.userService.registerUser(this.user).subscribe(res => {
        this.isUserExist = false;
        this.isSuccessed = true;
      }, error => {
        this.isUserExist = true;
        this.isSuccessed = false;
      });
    }
  }

}