import { Component } from '@angular/core';
import { Birthday } from '../list-birthday/iBirthday';
import { MatDialog } from '@angular/material/dialog';
import { BirthdayDialogComponent, BirthdayDialogResult } from '../birthday-dialog/birthday-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { ListBirthdayComponent } from '../list-birthday/list-birthday.component';


const getObservable = (collection: AngularFirestoreCollection<Birthday>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Birthday[]) => {
    subject.next(val);
    console.log(subject.getValue());
  });
  return subject;
};

@Component({
  selector: 'app-birthday-page',
  templateUrl: './birthday-page.component.html',
  styleUrls: ['./birthday-page.component.css']
})
export class BirthdayPageComponent {
 // bday_list = getObservable(this.store.collection('birthdays'));
  

  bday_list = this.store.collection('birthdays').valueChanges({ idField: 'id' });
  usersDb = this.store.collection('users').valueChanges({ idField: 'id' });
  title = 'birthday-app';

 

  editBirthday(birthday: Birthday): void {
    const dialogRef = this.dialog.open(BirthdayDialogComponent, {
      width: '270px',
      data: {
        birthday,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: BirthdayDialogResult) => {
      if (result.delete) {
        this.store.collection('birthdays').doc(birthday.id).delete();
      } else {
        this.store.collection('birthdays').doc(birthday.id).update(birthday);
      }
    });
  }

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
    console.log(this.bday_list);
  }

  newBirthday(): void {
    const dialogRef = this.dialog.open(BirthdayDialogComponent, {
      width: '270px',
      data: {
        birthday: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: BirthdayDialogResult) => this.store.collection('birthdays').add(result.birthday));
  }
}
