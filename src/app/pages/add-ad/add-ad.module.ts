import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddAdPageRoutingModule } from './add-ad-routing.module';
import { AddAdPage } from './add-ad.page';

@NgModule({
  declarations: [AddAdPage],
  imports: [
    CommonModule,      // Voor Angular basisfunctionaliteiten
    FormsModule,       // Voor het gebruik van [(ngModel)]
    IonicModule,       // Voor het gebruik van Ionic-componenten
    AddAdPageRoutingModule // Voor routing naar deze pagina
  ]
})
export class AddAdPageModule {}
