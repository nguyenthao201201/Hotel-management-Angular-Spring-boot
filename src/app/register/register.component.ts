import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
//Khai báo các biến tương ứng với các trường trong form đăng ký
phone: string;
password: string;
retypePassword: string;
fullName: string;
address: string;
dateOfBirth: Date;
isAccepted: boolean;

constructor( private http: HttpClient, private router: Router
  ) {
this.phone = '';
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
  console.log(`Phone typed: ${this.phone}`);
}

register() {
  const message = `Phone: ${this.phone}` +
   `Password: ${this.password}`+ 
   `RetypePassword: ${this.retypePassword}`+
   `FullName: ${this.fullName}`+
   `Address: ${this.address}`+
   `DateOfBirth: ${this.dateOfBirth}`+
   `IsAccepted: ${this.isAccepted}`;
 // alert(message);
 debugger 
 const apiUrl = "http://localhost:8080/api/v1/users/register";
 const registerData = {
            "full_name": this.fullName,
            "phone_number": this.phone,
            "address": this.address,
            "password": this.password,
            "retype_password": this.retypePassword,
            "date_of_birth": this.dateOfBirth,
            "role_id": 2
 }
 const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
 
 this.http.post(apiUrl, registerData, {headers})
          .subscribe({
            next: (response: any) => {
              debugger
              if (response && (response.status === 200 || response.status === 201)) {
                //Đăng ký thành công
                this.router.navigate(['/login']);
               // alert("Đăng ký thành công");
              } else {
                //Đăng ký thất bại
                alert(response.message);
              }
          }, 
          complete: () => {
            debugger
          },
          error: (error: any) => {
            debugger
            console.error('Đăng ký thất bại', error);
          }
        });
}
//Check hai password có giống nhau hay không
checkPasswordsMatch() {
  if (this.password !== this.retypePassword) {
    this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true });
   
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
      this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
    } else {
      this.registerForm.form.controls['dateOfBirth'].setErrors(null);
    }
  }
}
}
