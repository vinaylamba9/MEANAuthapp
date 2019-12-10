import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private register_url = "http://localhost:3000/api/register";
  private login_url = "http://localhost:3000/api/login";

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user){
    return this.http.post<any>(this.register_url, user);
  }

  login(user){
    return this.http.post<any>(this.login_url, user);
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}
