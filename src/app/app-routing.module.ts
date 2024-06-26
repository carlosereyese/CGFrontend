import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
