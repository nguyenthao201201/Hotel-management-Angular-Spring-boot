import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/users/user.response';
import { TokenService } from 'src/app/file-service/token.service';
import { UserService } from 'src/app/file-service/user.service';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackupService } from 'src/app/file-service/backup.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  adminComponent: string = 'orders';
  userResponse?:UserResponse | null;
  constructor(
    private userService: UserService,       
    private tokenService: TokenService,  
    private backupService: BackupService,  
    private router: Router,
  ) {
    
   }
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();    
   }  
  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();    
  }
  backup() {
    this.backupService.backup().subscribe(
      (response: any) => {
        console.log(response);
        alert('Backup thành công');
      },
      (error) => {
        console.log(error);
        alert('Backup thất bại');
      }
    );
  }
  
  showAdminComponent(componentName: string): void {
  // debugger
    this.adminComponent = componentName;
  }
}
