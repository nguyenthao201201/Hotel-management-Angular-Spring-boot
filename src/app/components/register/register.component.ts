import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../file-service/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
//Khai báo các biến tương ứng với các trường trong form đăng ký
phoneNumber: string;
password: string;
retypePassword: string;
fullName: string;
address: string;
dateOfBirth: Date;
isAccepted: boolean;

constructor(  private router: Router, private userService: UserService) {
this.phoneNumber = '';
this.password = '';
this.retypePassword = ''; 
this.fullName = '';
this.address = '';
this.dateOfBirth = new Date();
this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
this.isAccepted = false;
//inject 
}

onPhoneChange() {
  console.log(`Phone typed: ${this.phoneNumber}`);
}

register() {
  const message = `Phone: ${this.phoneNumber}` +
   `Password: ${this.password}`+ 
   `RetypePassword: ${this.retypePassword}`+
   `FullName: ${this.fullName}`+
   `Address: ${this.address}`+
   `DateOfBirth: ${this.dateOfBirth}`+
   `IsAccepted: ${this.isAccepted}`;
 // alert(message);
 debugger 
// 
 const registerDTO:RegisterDTO = {
            "full_name": this.fullName,
            "phone_number": this.phoneNumber,
            "address": this.address,
            "password": this.password,
            "retype_password": this.retypePassword,
            "date_of_birth": this.dateOfBirth,
            "role_id": 1
 }
 this.userService.register(registerDTO).subscribe({
  next: (response: any) => {
    console.log("Đăng ký thành công",response);
    alert("Đăng ký thành công");
    this.router.navigate(['/login']);
}, 
complete: () => {
  //debugger
},

error: (error: any) => {
  alert(`Cannot register. An error occured: ${error.error}`);
}
})
//  this.http.post(apiUrl, registerData, {headers})
//           .subscribe();
}
//Check hai password có giống nhau hay không
checkPasswordsMatch() {
  if (this.password !== this.retypePassword) {
    this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch': true });
   
  } else {
    this.registerForm.form.controls['retypePassword'].setErrors(null);
  }
}

checkAge() {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge': true });
    } else {
      this.registerForm.form.controls['dateOfBirth'].setErrors(null);
    }
  }
}
}
