import { Component, Input } from '@angular/core';
import { Birthday } from '../list-birthday/iBirthday';
import { MatDialog } from '@angular/material/dialog';
import { BirthdayDialogComponent, BirthdayDialogResult } from '../birthday-dialog/birthday-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-birthday-page',
  templateUrl: './birthday-page.component.html',
  styleUrls: ['./birthday-page.component.css']
})
export class BirthdayPageComponent {
  bday_list = this.store.collection('birthdays').valueChanges({ idField: 'id' });
  title = 'birthday-app';
  myMonth=0;
  // use this for looping instead of extra html
  @Input() months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // clicking on a birthday
  editBirthday(birthday: Birthday): void {
    //opens dialog box
    const dialogRef = this.dialog.open(BirthdayDialogComponent, {
      width: '315px',
      // allows css change to inputs
      panelClass: 'my-dialog',
      data: {
        birthday,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: BirthdayDialogResult) => {
      try{
        if (result.delete) { //clicked delete button
          this.store.collection('birthdays').doc(birthday.id).delete();
        } 
        else { // clicked Save button
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
// creates month number to check if a birthday's month is the same as the tab's month
  idx(index: number): any {
    return index;
    }
}
