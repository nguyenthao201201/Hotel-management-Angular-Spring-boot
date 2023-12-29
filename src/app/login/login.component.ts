import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserService } from '../file-service/user.service';
import { TokenService } from '../file-service/token.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Role } from '../models/role';
import { RoleService } from '../file-service/role.service';
import { LoginResponse } from '../responses/users/login.response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string;
  password: string;

  
  roles: Role[] = []; // Mảng roles
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown

  onPhoneChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
  }

  constructor(  private router: Router, 
                private userService: UserService,
                private tokenService: TokenService,
                private roleService: RoleService) {
    this.phoneNumber = '12345678';
    this.password = '123';
  }

  ngOnInit() {
    // Gọi API lấy danh sách roles và lưu vào biến roles
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { // Sử dụng kiểu Role[]
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    });
  }
  
login() {
  const message = `Phone: ${this.phoneNumber}` +
                  `Password: ${this.password}`
 // alert(message);
 debugger 

 const loginDTO:LoginDTO = {
            phone_number: this.phoneNumber,
            password: this.password,
            role_id: this.selectedRole?.id ?? 1
    };

 this.userService.login(loginDTO).subscribe({
  next: (response: LoginResponse) => {
    debugger
    const {token} = response;
    if (this.rememberMe) {
      this.tokenService.setToken(token);
    }   
 
}, 
complete: () => {
  debugger
},

error: (error: any) => {
  debugger
  alert(`Cannot login. An error occured: ${error.error}`);
}
})
//  this.http.post(apiUrl, registerData, {headers})
//           .subscribe();
}
}
