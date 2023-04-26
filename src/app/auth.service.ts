import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<any>(null);

  constructor() { }

  setUser(user: any) {
    console.log('in set user')
    this.user$.next(user);
  }

  getUser() {
    console.log('in get user')
    return this.user$.asObservable();
  }
  
}