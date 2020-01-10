import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CardResultsComponent } from './pages/card-results/card-results.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './pages/auth.guard';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/login-page',
    pathMatch: 'full'
  },
  {
    path: 'user-register',
    component: RegisterComponent
  },
  {
    path: 'login-page',
    component: LoginComponent
  },
  {
    path: 'home-page/:userId',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card-results/:userId',
    component: CardResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
