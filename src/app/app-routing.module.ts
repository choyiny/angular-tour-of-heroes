import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// local imports
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// routes
const routes: Routes = [
    // matches empty path and redirect to dashboard
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // matches /heroes displaying HeroesComponent
    { path: 'heroes', component: HeroesComponent },
    // dashboard path
    { path: 'dashboard', component: DashboardComponent },
    // hero detail, with id passed in
    { path: 'detail/:id', component: HeroDetailComponent }
]


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
