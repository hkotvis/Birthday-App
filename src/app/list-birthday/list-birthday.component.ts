import { Birthday } from './iBirthday';
import { Component,  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-birthday',
  templateUrl: './list-birthday.component.html',
  styleUrls: ['./list-birthday.component.css']
})
export class ListBirthdayComponent {

  @Input()  birthday: Birthday;
  @Output() edit = new EventEmitter<Birthday>();
  }


