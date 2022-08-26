import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileGuard } from './guards/file.guard';

import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/information/information.component';
import { PageNotFoundComponent } from './pages/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'information', component: InformationComponent, canActivate: [FileGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
