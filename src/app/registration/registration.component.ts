import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface AuthResponse {
  token: string;
  user: any;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
    ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.signupForm.value.username);
    formData.append('first_name', this.signupForm.value.first_name);
    formData.append('last_name', this.signupForm.value.last_name);
    formData.append('email', this.signupForm.value.email);
    formData.append('password1', this.signupForm.value.password1);
    formData.append('password2', this.signupForm.value.password2);
  
    this.http.post<AuthResponse>('http://localhost:8000/accounts/signup/', formData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.authService.setUser(response.user)
          this.router.navigate(['/'])
        },
        error => console.log(error)
      );
  }

  getLogin() {
    this.router.navigate(['/login'])
  }
}
