import { Injectable } from '@angular/core';
import { CreateHeroDTO, Hero } from './models/models';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroes: Hero[] = [
    {
      id: 1,
      name: "Mighty Hulk",
      type: "strength",
      superpower: "Superhuman Strength",
      rating: 95,
      health: 100,
      description: "A towering giant with immense strength, able to smash through any obstacle."
    },
    {
      id: 2,
      name: "Brainiac",
      type: "intelligence",
      superpower: "Genius-level intellect",
      rating: 90,
      health: 80,
      description: "A brilliant mind capable of strategizing and solving complex problems."
    },
    {
      id: 3,
      name: "Mystica",
      type: "magic",
      superpower: "Spellcasting",
      rating: 85,
      health: 70,
      description: "A master of mystical arts, able to bend reality with her spells."
    },
    {
      id: 4,
      name: "Flashbolt",
      type: "speed",
      superpower: "Super Speed",
      rating: 88,
      health: 75,
      description: "The fastest hero, capable of running at lightning speed."
    },
    {
      id: 5,
      name: "Iron Sentinel",
      type: "technology",
      superpower: "Advanced suit of armor",
      rating: 92,
      health: 90,
      description: "An inventor with a suit equipped with advanced tech and weapons."
    },
    {
      id: 6,
      name: "Steel Fist",
      type: "strength",
      superpower: "Unbreakable fists",
      rating: 80,
      health: 85,
      description: "A fearless warrior known for his powerful fists and endurance."
    },
    {
      id: 7,
      name: "Oracle",
      type: "intelligence",
      superpower: "Precognition",
      rating: 78,
      health: 65,
      description: "Can see into the future, allowing her to anticipate her opponents' moves."
    },
    {
      id: 8,
      name: "Sorceress",
      type: "magic",
      superpower: "Elemental manipulation",
      rating: 84,
      health: 70,
      description: "Controls elements like fire, water, and air to unleash powerful attacks."
    },
    {
      id: 9,
      name: "Blaze",
      type: "speed",
      superpower: "Pyrokinetic speed",
      rating: 86,
      health: 75,
      description: "Runs at blazing speeds, leaving a trail of flames behind."
    },
    {
      id: 10,
      name: "Techno Mage",
      type: "technology",
      superpower: "Technomancy",
      rating: 89,
      health: 80,
      description: "Can control technology and communicate with machines."
    },
    {
      id: 11,
      name: "Crusher",
      type: "strength",
      superpower: "Earthquake punches",
      rating: 83,
      health: 90,
      description: "With a single punch, he can create shockwaves and earthquakes."
    },
    {
      id: 12,
      name: "Mindbender",
      type: "intelligence",
      superpower: "Telepathy",
      rating: 87,
      health: 68,
      description: "Can read and manipulate the minds of others."
    },
    {
      id: 13,
      name: "Stormbringer",
      type: "magic",
      superpower: "Weather control",
      rating: 90,
      health: 80,
      description: "Can summon storms and control the weather to aid in battles."
    }
  ];
  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);

  constructor() {
  }

  getAllHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  getTopRandomHeroes(count: number): Observable<Hero[]> {
    let shuffleHeroes = [...this.heroes];

    for (let i = shuffleHeroes.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i +1));
      [shuffleHeroes[i], shuffleHeroes[randomNum]] = [shuffleHeroes[randomNum], shuffleHeroes[i]];
    }
    return of(shuffleHeroes.slice(0, count));
  }

  addHero(createHeroDto: CreateHeroDTO): Observable<Hero> {
    const newHeroId = Math.max(...this.heroes.map(hero => hero.id)) + 1;

    const newHeroToAdd: Hero = {
      id: newHeroId,
      ...createHeroDto
    };

    this.heroes.push(newHeroToAdd);
    this.heroesSubject.next(this.heroes);
    return new BehaviorSubject<Hero>(newHeroToAdd).asObservable();
  }

  updateHero(updatedHero: Hero): Observable<Hero> {
    const index = this.heroes.findIndex(h => h.id === updatedHero.id);
    if (index !== -1) {
      this.heroes[index] = updatedHero;
      this.heroesSubject.next([...this.heroes]);
      return of(updatedHero);
    }
    throw new Error(`Hero with id ${updatedHero.id} not found`);
  }

  deleteHero(id: number): Observable<void> {
    const index = this.heroes.findIndex(hero => hero.id === id);

    if (index === -1) {
      return throwError(() => new Error('Hero not found...'))
    }

    this.heroes.splice(index, 1);
    this.heroesSubject.next([...this.heroes]);
    return of(void 0);
  }
}
