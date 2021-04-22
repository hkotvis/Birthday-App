import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth/auth.service';
import { BirthdayDialogComponent, BirthdayDialogResult } from './birthday-dialog/birthday-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(private dialog: MatDialog, private store: AngularFirestore,public  authService:  AuthService){}

 // creates a new birthday
 newBirthday(): void {
  const dialogRef = this.dialog.open(BirthdayDialogComponent, {
    width: '315px',
    panelClass: 'my-dialog',
    data: {
      birthday: {
        birthId: this.authService.user.uid // assigns birthId to userId so we know which user created this birthday
      },
    },
  });
  dialogRef
    .afterClosed()
    .subscribe((result: BirthdayDialogResult) => this.store.collection('birthdays').add(result.birthday)); // saves to db
}
}
