import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MatChip } from '@angular/material/chips';
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
  @Input() catOptions: string[] = ["call", "redeem", "textsms", "markunread_mailbox"];
  constructor(
    public dialogRef: MatDialogRef<BirthdayDialogComponent>,
    private cdref: ChangeDetectorRef,
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

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

setSelected(chip: MatChip){
    try{
      if(this.data.birthday.categories.includes(chip.value)) chip.selected = true;
    }
    catch{
      chip.selected = false;
    }
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
    if(chip.selected){
        try{

          this.data.birthday.categories[this.data.birthday.categories.length] = chip.value;
        }
        catch{
          this.data.birthday.categories = [chip.value];
        }
      
    }
    else if(!chip.selected){
      try{
        const index = this.data.birthday.categories.indexOf(chip.value);
        if (index > -1) {
          this.data.birthday.categories.splice(index, 1);
        }
      }
      catch{
        this.data.birthday.categories = [];
      }
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