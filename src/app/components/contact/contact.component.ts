import { Component } from '@angular/core';
import { AtmSearchService } from 'src/app/file-service/atmsearch.service';
import { ATMResponse } from 'src/app/responses/atm.response';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  Name: string;
  Province: string;
  informationATM: string;
  constructor(
    private atmsearchservice: AtmSearchService,
  ) {
    this.Name = '';
    this.Province = '34';
    this.informationATM = '';
   }

  searchATM() {
    debugger;
    const atmData = {
      Name: this.Name,
      Province: this.Province
    };
    this.atmsearchservice.getAtm(atmData).subscribe(
      (response: ATMResponse) => {
        debugger
        console.log(response);
        this.informationATM = 
        response.Item[0].BranchType + ' - Tên:' +
        response.Item[0].Name + ' - Địa chỉ:' +
         response.Item[0].Addr + ' - Phường:' + 
         response.Item[0].Ward+ ' - Đường:' +
         response.Item[0].District.FullName + ' - Thành phố:' +
         response.Item[0].Province.FullName + ' - Phone:' +
          
        
          response.Item[0].Phone + ' - Thời gian làm việc:' +
          response.Item[0].WorkingTime;
      //this.informationATM = response.Item[0];
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
