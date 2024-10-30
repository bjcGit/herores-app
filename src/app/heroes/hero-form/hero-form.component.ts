import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.models';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent implements OnInit {

  hero: Hero = {
    nombre: '',
    bio: '',
    img: '',
    aparicion: '',
    casa: ''
  };
  editing: boolean = false;

  
  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.heroService.getHeroById(id).subscribe(response => {
        this.hero = response.resp;
      });
    }
  }

  saveHero(): void {
    console.log(this.hero);  // Revisa qué datos se están enviando
    if (this.editing) {
      this.updateHero();
    } else {
      this.createHero();
    }
  }

  createHero(): void {
    this.heroService.createHero(this.hero).subscribe(() => {
      this.router.navigate(['/heroes']);
    });
  }

  updateHero(): void {
    if (this.hero._id) {
      this.heroService.updateHero(this.hero._id, this.hero).subscribe(response => {
        this.router.navigate(['/heroes']);  // Redirige a la lista tras actualizar
      }, error => {
        console.error('Error actualizando el héroe', error);
      });
    }
  }

}
