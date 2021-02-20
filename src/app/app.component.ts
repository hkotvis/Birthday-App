import { Component } from '@angular/core';
import { Birthday } from './specific-birthday/specific-birthday';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'birthday-app';
  bday_list: Birthday[] = [
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

  constructor(private dialog: MatDialog) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.bday_list.push(result.task));
  }
}
