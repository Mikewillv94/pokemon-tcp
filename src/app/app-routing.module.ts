import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PackCreateComponent } from './pages/pack/pack-create/pack-create.component';
import { PackDetailsComponent } from './pages/pack/pack-details/pack-details.component';
import { PackEditComponent } from './pages/pack/pack-edit/pack-edit.component';
import { PackListComponent } from './pages/pack/pack-list/pack-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit/:id', component: PackEditComponent },
  { path: 'create', component: PackCreateComponent },
  { path: 'list', component: PackListComponent },
  { path: 'details/:id', component: PackDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
