import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero.models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() hero!: Hero;

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/150';  // Imagen predeterminada
  }
  
  deleteHero(): void {
    // Implementar la lógica para eliminar el héroe
  }

}
