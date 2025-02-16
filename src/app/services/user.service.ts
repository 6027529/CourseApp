import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.example.com/user'; // Vervang dit met jouw API-url

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<{ name: string; email: string }>(this.apiUrl);
  }
}
