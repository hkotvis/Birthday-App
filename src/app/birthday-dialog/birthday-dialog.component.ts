import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Birthday, MyDate } from '../list-birthday/iBirthday';

@Component({
  selector: 'app-birthday-dialog',
  templateUrl: './birthday-dialog.component.html',
  styleUrls: ['./birthday-dialog.component.css'],
})
export class BirthdayDialogComponent {
  private backupBirthday: Partial<Birthday> = { ...this.data.birthday };
  thisDate: MyDate = new MyDate();
  showDate: Date;
  constructor(
    public dialogRef: MatDialogRef<BirthdayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BirthdayDialogData
  ) {
    try{
      console.log(this.data.birthday.birthdate);
      var subStr = data.birthday.birthdate.toString().match("=(.*),");
      this.thisDate.seconds = Number(subStr[1]);
      this.showDate  =new Date(this.thisDate.seconds*1000);
    }
    catch{
      console.log("add new bday");
    }
  }

  cancel(): void {
    try{
      this.data.birthday.name = this.backupBirthday.name;
      this.data.birthday.birthdate = this.backupBirthday.birthdate;
      this.data.birthday.notes = this.backupBirthday.notes;
      this.data.birthday.categories = this.backupBirthday.categories;
      this.dialogRef.close();
    }
    catch{
      this.dialogRef.close();
    }
  }
}

export interface BirthdayDialogData {
  birthday: Partial<Birthday>;
  enableDelete: boolean;
}

export interface BirthdayDialogResult {
  birthday: Birthday;
  delete?: boolean;
}