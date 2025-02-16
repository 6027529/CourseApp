import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.page.html',
  styleUrls: ['./add-ad.page.scss'],
})
export class AddAdPage {
  ad: { id: number; title: string; description: string; price: number | null } = {
    id: 0,  // ID is nu een nummer
    title: '',
    description: '',
    price: null,
  };

  constructor(private router: Router) {}

  submitAd() {
    // Validatie: Controleer of alle velden zijn ingevuld
    if (!this.ad.title || !this.ad.description || this.ad.price === null) {
      alert('Vul alle velden in.');
      return;
    }

    // Genereer een unieke ID voor de advertentie
    this.ad.id = this.generateId();

    // Haal bestaande advertenties op uit localStorage
    const ads = JSON.parse(localStorage.getItem('ads') || '[]');

    // Voeg de nieuwe advertentie toe
    ads.push(this.ad);

    // Sla de bijgewerkte advertenties op in localStorage
    localStorage.setItem('ads', JSON.stringify(ads));

    // Toon een succesmelding
    alert('Advertentie succesvol toegevoegd!');

    // Navigeer terug naar de Homepagina
    this.router.navigate(['/home']);
  }

  // Hulpmethode: Genereer een unieke ID
  private generateId(): number {
    return Math.floor(Math.random() * 1000000);  // Genereer een nummer in plaats van een string
  }
}
