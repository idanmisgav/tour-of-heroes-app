import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Hero } from '../types/hero';
import { HeroService } from './hero.service';

import { OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  providers: [HeroService],
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  
  getHeroes(): void {
    this.heroService.getHeroes().then(resultedHeroesFromService => this.heroes = resultedHeroesFromService);
  }

    ngOnInit(): void {
    this.getHeroes();
  }
  
  onSelect(hero: Hero): void {
  this.selectedHero = hero;
  }

  gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.create(name)
    .then(resultedHeroesFromService => {
      this.heroes = resultedHeroesFromService;
      this.selectedHero = null;
    });
}

delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .then(resultedHeroesFromService => this.heroes = resultedHeroesFromService);
}

pressHandler(event): boolean {
    if(event.key === ':')
       return false;
    }
 }