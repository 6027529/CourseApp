import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdPage } from './add-ad.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdPageRoutingModule {}
