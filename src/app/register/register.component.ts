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
    password: new FormControl('', [Validators.required, Validators.minLength(6) ])
  });
  hide=true;
  submitted = false;
  loading = false;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {  }
  get f() { return this.register.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.register.invalid) {
        return;
    }
    this.loading = true;
    
  }
}