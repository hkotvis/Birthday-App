import { Birthday, MyDate } from './iBirthday';
import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-list-birthday',
  templateUrl: './list-birthday.component.html',
  styleUrls: ['./list-birthday.component.css']
})
export class ListBirthdayComponent {
  
  @Input()  birthday: Birthday;
  @Input() myMonth: number;
  @Output() edit = new EventEmitter<Birthday>();
  showDate = new Date();
  constructor(public  authService:  AuthService) {}
  thisDate: MyDate = new MyDate();
  get filterList(){
    try{
      var subStr = this.birthday.birthdate.toString().match("=(.*),");
      this.thisDate.seconds = Number(subStr[1]);
      this.showDate  =new Date(this.thisDate.seconds*1000);
      if(this.birthday.birthId.includes(this.authService.user.uid)){
        if(this.showDate.getMonth()==this.myMonth){
          return this.birthday;
        }
      }
    }
    catch(exception){      
      return null;
    }
    
  }
}


