import { Component } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sync',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sync.component.html',
  styleUrl: './sync.component.css'
})
export class SyncComponent {

  heroesToSync: any[] = [];

  constructor(private heroService: HeroService) {
    this.heroesToSync = this.heroService.getHeroesFromLocal();
  }

  syncHeroes(): void {
    this.heroService.syncHeroesToLocalStorage();
    alert('Personajes sincronizados desde la API al Local Storage.');
  }


}
