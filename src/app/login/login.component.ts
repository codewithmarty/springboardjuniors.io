import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

interface AuthResponse {
  token: string;
  user: User;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

    constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password1: ['', Validators.required]
      });
    }

    onSubmit() {
      const formData = new FormData();
      formData.append('username', this.loginForm.value.username);
      formData.append('password1', this.loginForm.value.password1);
    
      this.http.post<AuthResponse>('http://localhost:8000/accounts/login/', formData)
        .subscribe(
          response => {
            localStorage.setItem('token', response.token);
            this.authService.setUser(response.user)
            this.appComponent.user = response.user
            this.router.navigate(['/'])
          },
          error => console.log(error)
        );
      }

    getSignUp() {
      this.router.navigate(['/register'])
    }
}
