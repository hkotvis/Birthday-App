import { Component, Input } from '@angular/core';
import { Birthday } from '../list-birthday/iBirthday';
import { MatDialog } from '@angular/material/dialog';
import { BirthdayDialogComponent, BirthdayDialogResult } from '../birthday-dialog/birthday-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


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
  bday_list = this.store.collection('birthdays').valueChanges({ idField: 'id' });
  title = 'birthday-app';
  myMonth=0;
  @Input() months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  editBirthday(birthday: Birthday): void {
    const dialogRef = this.dialog.open(BirthdayDialogComponent, {
      width: '315px',
      panelClass: 'my-dialog',
      data: {
        birthday,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: BirthdayDialogResult) => {
      try{
        if (result.delete) {
          this.store.collection('birthdays').doc(birthday.id).delete();
        } 
        else {
          console.log(result.birthday.birthdate)
          this.store.collection('birthdays').doc(birthday.id).update(birthday);
        }
      }
      catch{
        console.log("Closed dialog box without saving or deleting");
      }
    });
  }

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }

  idx(index: number, employee: any): any {
    return index;
    }
}
