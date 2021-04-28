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
  showDate: Date;
  thisDate: MyDate = new MyDate(); // need this to view Firestore timestamp as a Date
  constructor(public  authService:  AuthService) {}

  // filters to only display birthdays in specified myMonth
  get filterList(){
    try{
      var subStr = this.birthday.birthdate.toString().match("=(.*),");
      this.thisDate.seconds = Number(subStr[1]);
      this.showDate  =new Date(this.thisDate.seconds*1000);
      // only look at birthdays associated with the user logged in
      if(this.birthday.birthId.includes(this.authService.user.uid)){
        if(this.showDate.getMonth()==this.myMonth){ //months match
          return this.birthday;
        }
      }
    }
    catch(exception){  // months don't match
      return null;
    }
    
  }
}


