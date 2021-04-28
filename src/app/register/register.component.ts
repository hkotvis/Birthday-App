import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  formBuilder = new FormBuilder;

  register: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'), Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6) ]),
    confirm_password: new FormControl('',[Validators.required])
  }, { 
    validator: ConfirmedValidator('password', 'confirm_password')
  });
  hide=true;
  submitted = false;
  loading = false;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.error.message =''; // clear error message on success so message is gone on logout
  }
  get f() { return this.register.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.register.invalid) {
        return;
    }
    this.loading = true;
  }
  inUse: string = "The email address is already in use by another account.";
}
export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmMatch) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}