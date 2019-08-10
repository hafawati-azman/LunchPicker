import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'restaurant', loadChildren: './restaurant/restaurant.module#RestaurantPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'show-restaurant/:restaurant_id/:restaurant_name/:restaurant_description/:restaurant_price/:restaurant_address', 
  loadChildren: './show-restaurant/show-restaurant.module#ShowRestaurantPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'add-eating-history', loadChildren: './add-eating-history/add-eating-history.module#AddEatingHistoryPageModule' },
  { path: 'edit-eating-history', loadChildren: './edit-eating-history/edit-eating-history.module#EditEatingHistoryPageModule' },
  { path: 'search-restaurant', loadChildren: './search-restaurant/search-restaurant.module#SearchRestaurantPageModule' },
  { path: 'search-restaurant-result', loadChildren: './search-restaurant-result/search-restaurant-result.module#SearchRestaurantResultPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
