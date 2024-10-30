import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.models';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl = 'https://rest-sorella-production.up.railway.app/api/heroes';
  private localStorageKey = 'characters';

  constructor(private http: HttpClient) {}

  // Obtener todos los héroes
  getHeroes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener héroe por ID
  getHeroById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo héroe
  createHero(hero: Hero): Observable<any> {
    return this.http.post<any>(this.apiUrl, hero);
  }

  // Actualizar un héroe
  updateHero(id: string, hero: Partial<Hero>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, hero);
  }

  // Eliminar un héroe
  deleteHero(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Guardar héroes en el Local Storage
  saveHeroToLocal(hero: Hero): void {
    const heroes = this.getHeroesFromLocal();
    heroes.push(hero);
    localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
  }

  syncHeroesToLocalStorage(): void {
    this.getHeroes().subscribe(response => {
      const heroes = response.resp; // Asumimos que los héroes vienen bajo "resp"
      localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
      console.log('Personajes sincronizados desde la API al Local Storage');
    }, error => {
      console.error('Error al sincronizar personajes desde la API', error);
    });
  }
  
  // Obtener héroes desde el Local Storage
  getHeroesFromLocal(): Hero[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }
}
