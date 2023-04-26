import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from './models/user';

interface AuthResponse {
  data: any;
  status: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token')
    if (token) {
      this.http.get<AuthResponse>(`http://localhost:8000/get_user?token=${token}`).subscribe(response => {
        this.authService.setUser(response.data)
      }, 
        error => console.log(error)
      )
      this.authService.getUser().subscribe((user: User) => {
        this.user = user;
      });    
    }
  }

  onClick() {
    localStorage.removeItem('token')
    this.http.get<AuthResponse>(`http://localhost:8000/${this.user.id}/logout`).subscribe(response => {
      console.log(response.status)
    },
      error => console.log(error)
    )
    this.authService.setUser(null)
  }
  
}


