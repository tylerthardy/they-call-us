import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEntityResolver } from 'projects/lib/src/lib/util/new-entity.resolver';
import { HomeComponent } from './home/home.component';
import { MyNamesComponent } from './my-names/my-names.component';
import { NameComponent } from './my-names/name/name.component';
import { NamesResolver } from './my-names/names.resolver';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-names', component: MyNamesComponent, },
  {
    path: 'my-names/new',
    component: NameComponent,
    resolve: { name: NewEntityResolver }
  },
  {
    path: 'my-names/:id',
    component: NameComponent,
    resolve: { name: NamesResolver }
  },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
