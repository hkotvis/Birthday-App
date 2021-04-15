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

 newBirthday(): void {
  const dialogRef = this.dialog.open(BirthdayDialogComponent, {
    width: '270px',
    data: {
      birthday: {
        birthId: this.authService.user.uid
      },
    },
  });
  dialogRef
    .afterClosed()
    .subscribe((result: BirthdayDialogResult) => this.store.collection('birthdays').add(result.birthday));
}
}
