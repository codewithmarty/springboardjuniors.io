import { Component } from '@angular/core';
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

  user: User | any;

  constructor(
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



  handleLogout() {
    localStorage.removeItem('token')
    this.http.get<AuthResponse>(`http://localhost:8000/${this.user.id}/logout`).subscribe(response => {
    },
      error => console.log(error)
    )
    this.user = null
    this.authService.setUser(null)
  }
  
}


