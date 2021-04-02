import { Birthday } from './iBirthday';
import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-list-birthday',
  templateUrl: './list-birthday.component.html',
  styleUrls: ['./list-birthday.component.css']
})
export class ListBirthdayComponent {
  
  @Input()  birthday: Birthday;
  @Output() edit = new EventEmitter<Birthday>();
  constructor(public  authService:  AuthService) { }
  get getBirthdayId(){
    return this.birthday.id;
  }
  get getUserId(){
    if (typeof(this.authService.user.uid) == undefined) {
      return null;
    }
    else return this.authService.user.uid;
  }

  get filterList(){
    if(this.getBirthdayId.includes(this.getUserId)) return this.birthday;
    else return null;
  }
}


