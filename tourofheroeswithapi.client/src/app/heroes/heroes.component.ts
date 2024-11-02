import { Component, OnInit } from '@angular/core';
import { Hero, HeroFormModel } from '../models/models';
import { HeroService } from '../hero.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero: Hero | null = null;
  isDetailsPanelOpen: boolean = false;
  heroForm!: FormGroup<HeroFormModel>;
  heroTypes: Hero['type'][] = ['strength', 'intelligence', 'magic', 'speed', 'technology'];
  tableHeaders: string [] = ['Hero', 'Type', 'Rating', 'Health', 'Superpower']

  constructor(
    private heroService: HeroService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.heroService.getAllHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
    this.initializeForm();
  }

  private initializeForm(hero?: Hero) {
    this.heroForm = this.fb.group<HeroFormModel>({
      name: this.fb.nonNullable.control(hero?.name || '', {
        validators: [Validators.required]
      }),
      type: this.fb.nonNullable.control(hero?.type || 'strength', {
        validators: [Validators.required]
      }),
      superpower: this.fb.nonNullable.control(hero?.superpower || '', {
        validators: [Validators.required]
      }),
      rating: this.fb.nonNullable.control(hero?.rating || 0, {
        validators: [Validators.required, Validators.min(0), Validators.max(100)]
      }),
      health: this.fb.nonNullable.control(hero?.health || 0, {
        validators: [Validators.required, Validators.min(0), Validators.max(100)]
      }),
      description: this.fb.nonNullable.control(hero?.description || '', {
        validators: [Validators.required]
      })
    });
  }

  updateHero(): void {
    if (this.heroForm.valid && this.selectedHero) {
      const formValue = this.heroForm.getRawValue();

      if (formValue.name &&
        formValue.type &&
        formValue.superpower &&
        formValue.rating !== null &&
        formValue.health !== null &&
        formValue.description) {

        const heroType = formValue.type as 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology';

        const updatedHero: Hero = {
          id: this.selectedHero.id,
          name: formValue.name,
          type: heroType,
          superpower: formValue.superpower,
          rating: formValue.rating,
          health: formValue.health,
          description: formValue.description
        };

        this.heroService.updateHero(updatedHero);
      }
    }
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
    this.initializeForm(hero);
    this.isDetailsPanelOpen = true;
  }

  closeDetailsPanel(): void {
    this.isDetailsPanelOpen = false;
    setTimeout(() => {
      this.selectedHero = null;
    }, 300);
  }

  getFormControl(controlName: keyof HeroFormModel): FormControl {
    return this.heroForm.get(controlName) as FormControl;
  }
}
