import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  emailAddress: any;

  loginForm = new FormGroup({
    emailAddress: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private toastr: ToastrService, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }

  loginUser()
  {
    if (this.loginForm.get('emailAddress')?.value == null || this.loginForm.get('emailAddress')?.value == "") {
      this.toastr.error('Please Enter Email');
      return;
    }

    else {
      this.emailAddress = this.loginForm.get('emailAddress')?.value;
      let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
      if (!emailReg.test(this.emailAddress.trim())) {
        this.toastr.error('Please Enter Vaild Email Address');
        return;
      }
    }

    if (this.loginForm.get('password')?.value == null || this.loginForm.get('password')?.value == "") {
      this.toastr.error('Please Enter Password');
      return;
    }

    let postJson = {
      emailAddress: this.loginForm.get('emailAddress')?.value,
      password: this.loginForm.get('password')?.value,
    }

    this.userService.userLogin(postJson).subscribe((res: any) => {
      console.log(res)

      if (res.status == "200") {
        sessionStorage.setItem('userId', res.data.userId);
        sessionStorage.setItem('userName', res.data.userName);
        this.router.navigate(['/view-task']);
      }

      
      if (res.status == "205") {
        this.toastr.error('Incorrect Email Address or Password');
        return;
      }
    });

  }

  

}
