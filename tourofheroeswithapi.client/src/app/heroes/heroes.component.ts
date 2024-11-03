import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/models';
import { HeroService } from '../hero.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  tableHeaders: string[] = ['Hero', 'Type', 'Rating', 'Health', 'Superpower', 'Remove'];
  selectedHeroId: number | null = null;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load all heroes
    this.heroService.getAllHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });

    this.route.firstChild?.paramMap.subscribe(params => {
      const id = params.get('id');
      this.selectedHeroId = id ? +id : null;
      console.log('Selected hero ID:', this.selectedHeroId);
    });
  }

  selectHero(hero: Hero): void {
    this.selectedHeroId = hero.id;
    this.router.navigate([hero.id], { relativeTo: this.route });
  }

  handleRemove($event: MouseEvent, heroId: number){
    $event.stopPropagation();
    this.heroService.deleteHero(heroId).subscribe({
      next: () => {
        const index = this.heroes.findIndex(hero => hero.id === heroId);
        this.heroes.slice(index, 1)
        console.log('Hero deleted successfully');
      },
      error: () => {
        console.log('Something went wrong...')
      }
    })
  }
}
