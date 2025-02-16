import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.page.html',
  styleUrls: ['./ad-details.page.scss'],
})
export class AdDetailsPage implements OnInit {
  ad: Ad | undefined; 
  adId: number | undefined;
  errorMessage: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Haal het ID op uit de route
    this.adId = Number(this.route.snapshot.paramMap.get('id'));
  
    // Log de opgehaalde adId om te controleren of het goed binnenkomt
    console.log('Gevonden adId:', this.adId);
  
    // Controleer of adId een geldig nummer is
    if (this.adId === undefined || isNaN(this.adId)) {
      this.errorMessage = 'Het ID van de advertentie is ongeldig';
      console.error('Ongeldig advertentie ID');
      return;
    }
  
    // Haal advertenties op uit localStorage
    const storedAds = JSON.parse(localStorage.getItem('ads') || '[]');
  
    // Zoek de advertentie met het opgegeven ID
    this.ad = storedAds.find((ad: Ad) => ad.id === this.adId);
  
    // Als de advertentie niet gevonden is, toon een aangepaste foutmelding
    if (!this.ad) {
      this.errorMessage = 'De gevraagde advertentie is niet beschikbaar';
      console.log('Advertentie niet gevonden');
    }
  }
}  
