import { Component } from '@angular/core';
import { Birthday } from './list-birthday/iBirthday';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


const getObservable = (collection: AngularFirestoreCollection<Birthday>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Birthday[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bday_list = getObservable(this.store.collection('birthdays'));


  //bday_list = this.store.collection('birthdays').valueChanges({ idField: 'id' });
  usersDb = this.store.collection('users').valueChanges({ idField: 'id' });
  title = 'birthday-app';

 

  editTask(birthday: Birthday): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        birthday,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      /*const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }*/
      if (result.delete) {
        this.store.collection('birthdays').doc(birthday.id).delete();
      } else {
        this.store.collection('birthdays').doc(birthday.id).update(birthday);
      }
    });
  }

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        birthday: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.store.collection('birthdays').add(result.birthday));
  }
}
