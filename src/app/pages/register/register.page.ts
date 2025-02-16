import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  register() {
    // Validatie: Controleer of alle velden ingevuld zijn
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Alle velden moeten ingevuld zijn.';
      return;
    }

    // Validatie: Controleer of wachtwoorden overeenkomen
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Wachtwoorden komen niet overeen.';
      return;
    }

    // Simuleer het opslaan van gebruikersgegevens in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.email === this.email);

    if (existingUser) {
      this.errorMessage = 'E-mailadres is al geregistreerd.';
      return;
    }

    // Voeg de nieuwe gebruiker toe
    const newUser = { name: this.name, email: this.email, password: this.password };

    // Voeg nieuwe gebruiker toe aan de lijst van gebruikers
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Succes: Navigeer naar de login-pagina
    alert('Registratie succesvol! Log in om verder te gaan.');
    this.router.navigate(['/login']);
  }
}
