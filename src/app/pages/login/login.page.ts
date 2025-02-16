import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  login() {
    console.log('Login knop werkt!');
  
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Opgeslagen gebruiker:', storedUser);
  
    if (this.email === storedUser.email && this.password === storedUser.password) {
      console.log('Login succesvol!');
      
      // Stuur gebruiker naar de homepagina
      this.router.navigate(['/home']);
    } else {
      console.log('Login mislukt. Verkeerde gegevens.');
      this.errorMessage = 'Ongeldig e-mailadres of wachtwoord.';
    }
  }
  
  
  
}
