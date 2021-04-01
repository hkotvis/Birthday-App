import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Birthday } from '../list-birthday/iBirthday';

@Component({
  selector: 'app-birthday-dialog',
  templateUrl: './birthday-dialog.component.html',
  styleUrls: ['./birthday-dialog.component.css'],
})
export class BirthdayDialogComponent {
  private backupBirthday: Partial<Birthday> = { ...this.data.birthday };
 
  constructor(
    public dialogRef: MatDialogRef<BirthdayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BirthdayDialogData
  ) {}
  changeSelected($event, category): void {
    category.selected = $event.selected;
  }
  categories= [
    {
      name: 'Call',
      selected: false
    },
    {
      name: 'Text',
      selected: false
    },
    {
      name: 'Gift',
      selected: false
    }
  ];

  cancel(): void {
    if(this.data && this.data.birthday && this.data.birthday.name) {
      this.data.birthday.name = this.backupBirthday.name;
      this.data.birthday.birthdate = this.backupBirthday.birthdate;
      this.data.birthday.notes = this.backupBirthday.notes;
      this.data.birthday.categories = this.backupBirthday.categories;
      this.dialogRef.close(this.data);
    }
    else {
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