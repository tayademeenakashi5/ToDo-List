import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register!: FormGroup; 
  signupCredentials: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;
  hidePassword: boolean = true;

 /* errorMessages: Record<string, Record<string, string>> = {
    'emailId': {
      'pattern': 'Please enter a valid email address (example@gmail.com).'
    },
    'userName': {
      'pattern': 'Username must contain at least 2 characters and start with a letter.'
    },
    'password': {
      'pattern': 'Password must be at least 5 characters long and contain at least one letter, one number, and one special character.'
    },
    'confirmPassword': {
      'passwordMismatch': 'Passwords do not match.'
    },
    'phoneNo': {
      'pattern': 'Please enter a valid 10-digit phone number.'
    },
    'age': {
      'min': 'Age must be at least 18 years.'
    }
  };*/

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.register = this.fb.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\\.com$')]],
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{2,}( [a-zA-Z]+)*$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{5,}$')]],
      //confirmPassword: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('^(?!0+$)[0-9]{10}$')]],
      age: ['', [Validators.required, Validators.min(18)]]
    }, {
      //validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    /*Object.keys(this.register.controls).forEach(fieldName => {
      this.register.get(fieldName)?.valueChanges.subscribe(() => this.onValueChanged(fieldName));
    });*/
  }

  onSubmit(): void {
    if (this.register.valid) {
      this.signupCredentials = this.register.value;
      console.log('Registration form submitted:', this.signupCredentials);
      this.authService.postUserDetails(this.signupCredentials)
        .subscribe(
          response => {
            console.log('Registration success:', response);
            this.successMessage = 'Successfully registered!';
          },
          error => {
            console.error('Registration error:', error);
            if (error.status === 409) {
              if (error.error && error.error.message === 'User already registered') {
                this.errorMessage = 'User already registered.';
              } else {
                this.errorMessage = 'User already exists.';
              }
            } else {
              this.errorMessage = 'An error occurred during registration.';
            }
            this.successMessage = null; 
          }
        );
    }
  }

  /*onValueChanged(fieldName: string): void {
    if (!this.register) {
      return;
    }
    const form = this.register;
    let errorMessageFound = false; // Flag to track if any error message is found

    for (const field in form.controls) {
      if (Object.prototype.hasOwnProperty.call(form.controls, field)) {
        const control = form.get(field);
        if (control instanceof FormControl && control.invalid && (control.dirty || control.touched)) {
          if (field !== fieldName) {
            // Clear the error message for other fields
            this.errorMessage = null;
          }
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.errorMessage = this.getErrorMessage(fieldName, key);
              errorMessageFound = true;
              break;
            }
          }
        }
      }
    }
    // If no error message is found, clear the error message
    if (!errorMessageFound) {
      this.errorMessage = null;
    }
  }*/

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null); // Add check for nullability
    }
  }

  /*getErrorMessage(fieldName: string, errorKey: string): string {
    return this.errorMessages[fieldName][errorKey] || '';
  }*/
}
