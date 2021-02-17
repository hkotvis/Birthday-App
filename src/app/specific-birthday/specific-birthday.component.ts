import { Birthday } from './specific-birthday';
import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-specific-birthday',
  templateUrl: './specific-birthday.component.html',
  styleUrls: ['./specific-birthday.component.css']
})
export class SpecificBirthdayComponent {
  @Input()  birthday: Birthday;
  @Output() edit = new EventEmitter<Birthday>();

}
