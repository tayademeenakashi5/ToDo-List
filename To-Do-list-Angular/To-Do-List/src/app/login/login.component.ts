import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*credentials={
    emailId:'',
    password:''
  }
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  constructor(private authService:AuthService, private router: Router){//adding todo list page

  }
  ngOnInit():void{

  }
  onSubmit() {
    if (this.credentials.emailId && this.credentials.password) {
      this.authService.generateToken(this.credentials).subscribe(
        (response: any) => { 
          console.log('Login success:', response);
          const token = response.token; 
          if (token) {
            this.successMessage = 'Login successful!';
            this.authService.setAuthenticated(true, token); // Pass the token to setAuthenticated
            this.router.navigate(['/todo-list']);
          } else {
            console.error('Token not found in the response.');
            this.errorMessage = 'Login failed.';
          }
        },
        error => {
          console.log(error);
          this.errorMessage = 'Login failed.';
        }
      );
    } else {
      console.log('Fields are empty');
    }
  }*/
  credentials = {
    emailId: '',
    password: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  task1: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.credentials.emailId && this.credentials.password) {
      this.authService.generateToken(this.credentials).subscribe(
        (response: any) => {
          console.log('Login success:', response);
          const token = response.token;
          if (token) {
            this.successMessage = 'Login successful!';
            this.authService.setAuthenticated(true, token);// Pass the token to setAuthenticated
            this.router.navigate(['/todo-list']);
          } else {
            console.error('Token not found in the response.');
            this.errorMessage = 'Login failed.';
          }
        },
        error => {
          console.log(error);
          this.errorMessage = 'Login failed.';
        }
      );
    } else {
      console.log('Fields are empty');
    }
  }

}