import { Component, OnInit } from '@angular/core';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ads: Ad[] = [];
  searchTerm: string = ''; // Zoekterm om advertenties te filteren

  ngOnInit() {
    // Haal advertenties op uit localStorage
    const storedAds = localStorage.getItem('ads');

    // Controleer of er advertenties zijn opgeslagen en of ze geldig zijn
    if (storedAds) {
      try {
        const parsedAds = JSON.parse(storedAds);
        
        // Controleer of parsedAds een array is
        if (Array.isArray(parsedAds)) {
          this.ads = parsedAds;
        } else {
          console.error('Gegevens in localStorage zijn geen geldige array');
        }
      } catch (error) {
        console.error('Fout bij het parsen van advertenties uit localStorage', error);
      }
    }
  }

  // Filter advertenties op basis van de zoekterm (titel, beschrijving, prijs)
  get filteredAds() {
    const searchTermLower = this.searchTerm.toLowerCase();
    const searchPrice = parseFloat(this.searchTerm);

    return this.ads.filter(ad => {
      const matchesTitleOrDescription = 
        ad.title.toLowerCase().includes(searchTermLower) || 
        ad.description.toLowerCase().includes(searchTermLower);
      
      const matchesPrice = !isNaN(searchPrice) && ad.price <= searchPrice;

      return matchesTitleOrDescription || matchesPrice;
    });
  }
}

