import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-ad',
    loadChildren: () => import('./pages/add-ad/add-ad.module').then(m => m.AddAdPageModule)
  },
  {
    path: 'ad-details/:id', // Zorg ervoor dat het ID in de route staat
    loadChildren: () => import('./pages/ad-details/ad-details.module').then(m => m.AdDetailsPageModule)
  },
  {
    path: 'chat/:adId',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    

  
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
