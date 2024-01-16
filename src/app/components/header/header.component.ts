import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../responses/users/user.response';
import { UserService } from '../../file-service/user.service';
import { TokenService } from '../../file-service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userResponse?: UserResponse | null;

  isPopoverOpen = false;
  activeNavItem: number;;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private router: Router,
    ) {
      this.activeNavItem = 0;
     }
  

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    //alert(`Clicked on "${index}"`);
    if(index === 0) {
      //debugger
      this.router.navigate(['/user-profile']);                      
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();    
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }

  ngOnInit(): void {
    // debugger
    let userResponse = this.userService.getUserResponseFromLocalStorage();
    this.userResponse = userResponse;
  }

  setActiveNavItem(index: number) {   
    // debugger
    this.activeNavItem = index;
    //alert(this.activeNavItem);
  }  
}
