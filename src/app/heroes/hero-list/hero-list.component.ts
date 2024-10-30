import { Component } from '@angular/core';
import { Hero } from '../../models/hero.models';
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css',
})
export class HeroListComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe(response => {
      this.heroes = response.resp;
    });
  }

  deleteHero(id: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar este héroe?')) {
      this.heroService.deleteHero(id).subscribe(() => {
        this.loadHeroes();  // Recargar la lista después de eliminar
      });
    }
  }
  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/150';  // Imagen predeterminada
  }
}
