import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', redirectTo: 'home/recent/artist', canActivate: [AuthGuard] },
  {
    path: 'home/:time',
    redirectTo: 'home/recent/artist',
    canActivate: [AuthGuard],
  },
  {
    path: 'home/:time/:type',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
