import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/file-service/user.service';
import { UserResponse } from 'src/app/responses/users/user.response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userResponse?: UserResponse | null;
constructor(private userService: UserService,
  ) { }

  ngOnInit(): void {
    debugger
    let userResponse = this.userService.getUserResponseFromLocalStorage();
    this.userResponse = userResponse;
  
  }
}
// 