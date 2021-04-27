import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from  '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formBuilder = new FormBuilder;
  hide=true;
  submitted = false;
  loading = false;

  // validate user input
  signin: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'), Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6) ])
  });
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); } 
  user_list = this.store.collection('users').valueChanges({ idField: 'id' });

  constructor( private store: AngularFirestore,public  authService:  AuthService) {}
  get f() { return this.signin.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signin.invalid) {
      return;
    }
    this.loading = true;
  }

  userNotFound: string = "There is no user record corresponding to this identifier. The user may have been deleted.";
  badPass: string = "The password is invalid or the user does not have a password.";
}

