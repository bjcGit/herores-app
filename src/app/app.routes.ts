import { Routes } from '@angular/router';
import { HeroFormComponent } from './heroes/hero-form/hero-form.component';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { SyncComponent } from './sync/sync.component';

export const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/new', component: HeroFormComponent },
  { path: 'heroes/:id/edit', component: HeroFormComponent },
  { path: 'sync', component: SyncComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
];
