import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Birthday } from '../specific-birthday/specific-birthday';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Birthday> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.name = this.backupTask.name;
    this.data.task.birthdate = this.backupTask.birthdate;
    this.dialogRef.close(this.data);
  }
}

export interface TaskDialogData {
  task: Partial<Birthday>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Birthday;
  delete?: boolean;
}