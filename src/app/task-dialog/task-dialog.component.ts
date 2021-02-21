import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Birthday } from '../list-birthday/iBirthday';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Birthday> = { ...this.data.birthday };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.birthday.name = this.backupTask.name;
    this.data.birthday.birthdate = this.backupTask.birthdate;
    this.data.birthday.notes = this.backupTask.notes;
    this.dialogRef.close(this.data);
  }
}

export interface TaskDialogData {
  birthday: Partial<Birthday>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  birthday: Birthday;
  delete?: boolean;
}