import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  mobileNo: any;
  emailAddress: any;

  registerForm = new FormGroup({
    activeFlag: new FormControl('Active'),
    userName: new FormControl(''),
    emailAddress: new FormControl(''),
    mobileNo: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private toastr: ToastrService, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }

  registerUser()
  {
    if (this.registerForm.get('userName')?.value == null || this.registerForm.get('userName')?.value == "") {
      this.toastr.error('Please Enter Name');
      return;
    }

    if (this.registerForm.get('mobileNo')?.value == null || this.registerForm.get('mobileNo')?.value == "") {
      this.toastr.error('Please Enter Mobile Number');
      return;
    }

    else {
      this.mobileNo = this.registerForm.get('mobileNo')?.value;
      let mobileReg = /^[6789][0-9]{9}$/;
      if (!mobileReg.test(this.mobileNo.trim())) {
        this.toastr.error('Please Enter Valid Mobile Number');
        return;
      }
    }

    if (this.registerForm.get('emailAddress')?.value == null || this.registerForm.get('emailAddress')?.value == "") {
      this.toastr.error('Please Enter Email');
      return;
    }

    else {
      this.emailAddress = this.registerForm.get('emailAddress')?.value;
      let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
      if (!emailReg.test(this.emailAddress.trim())) {
        this.toastr.error('Please Enter Vaild Email Address');
        return;
      }
    }


    if (this.registerForm.get('password')?.value == null || this.registerForm.get('password')?.value == "") {
      this.toastr.error('Please Enter Password');
      return;
    }

    let postJson = {
      activeFlag: "Active",
      userName: this.registerForm.get('userName')?.value,
      emailAddress: this.registerForm.get('emailAddress')?.value,
      mobileNo: this.registerForm.get('mobileNo')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.userService.userRegistration(postJson).subscribe((res: any) => {
      console.log(res)

      if (res.status == "200") {
        this.toastr.success('User Registered Successfully.');
        this.router.navigate(['/user-login']);
      }

      
      if (res.status == "205") {
        this.toastr.error('User Email Address Already Registered.');
        return;
      }
    });
  }

  backButton()
  {
    window.history.back();

  }

}
