import { Component } from '@angular/core';
import { Birthday } from './specific-birthday/specific-birthday';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'birthday-app';
  list: Birthday[] = [
    {
      name: 'Hailey',
      birthdate: new Date(1998, 11, 24),
      notes: "Chrsitmas Eve"
    },
    {
      name: 'Jacob',
      birthdate: new Date(1998, 1, 18),
      notes: "I love him"
    }
  ];
}
