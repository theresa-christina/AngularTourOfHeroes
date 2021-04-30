import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { HeroDetailComponent} from './hero-detail/hero-detail.component';

/** Routes tell Router which view to display when a user licks a link */
/** Angular route - has 2 properties - path: a string that matches the URL in the browser address bar */
/** component: the component that the router should create when navigating to this route */
/** colon : indicates placeholder */
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  /** adds RouterModule to the AppRoutingModule imports array and configures it with the routes */
  imports: [RouterModule.forRoot(routes)],

  /** exports RouterModule so it will be availble throughout the app */
  exports: [RouterModule]
})

export class AppRoutingModule { }
