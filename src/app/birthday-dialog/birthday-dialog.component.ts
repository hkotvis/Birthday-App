import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formBuilder = new FormBuilder;
  submitted = false;
  loading = false;
  maxDate = new Date();
  minDate = new Date(this.maxDate.getFullYear()-150, this.maxDate.getMonth(), this.maxDate.getDate());

  @Input() catOptions: string[] = ["call", "redeem", "textsms", "markunread_mailbox"];
 // validate user input
 dialogForm: FormGroup = this.formBuilder.group({
  name: new FormControl('', [Validators.required]),
  bdate: new FormControl('', [ Validators.required ])
});
get f() { return this.dialogForm.controls; }
  constructor(
    public dialogRef: MatDialogRef<BirthdayDialogComponent>,
    private cdref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: BirthdayDialogData
  ) {
    try{
      console.log(this.data.birthday.birthdate);
      var subStr = data.birthday.birthdate.toString().match("=(.*),");
      this.thisDate.seconds = Number(subStr[1]);
      this.showDate  =new Date(this.thisDate.seconds*1000); // formatted birthday to Date form
    }
    catch{
      console.log("add new bday");
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  // set selected categories
setSelected(chip: MatChip){
    try{
      if(this.data.birthday.categories.includes(chip.value)) chip.selected = true;
    }
    catch{
      chip.selected = false;
    }
  }
  // handle categories
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

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dialogForm.invalid) {
      return;
    }
    this.loading = true;
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