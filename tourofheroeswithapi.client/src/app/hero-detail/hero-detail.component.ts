import { Component, OnInit } from '@angular/core';
import { Hero, HeroFormModel, HeroType } from '../models/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{
  hero: Hero | null = null;
  heroForm!: FormGroup<HeroFormModel>;
  heroTypes: HeroType[] = ['strength', 'intelligence', 'magic', 'speed', 'technology'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.heroService.getAllHeroes().subscribe(heroes => {
          this.hero = heroes.find(h => h.id === +id) || null;

          if (this.hero) {
            this.initializeForm(this.hero);
          }
        });
      }
    });
  }

  private initializeForm(hero: Hero) {
    this.heroForm = this.fb.group<HeroFormModel>({
      name: this.fb.nonNullable.control(hero.name, {
        validators: [Validators.required]
      }),
      type: this.fb.nonNullable.control(hero.type, {
        validators: [Validators.required]
      }),
      superpower: this.fb.nonNullable.control(hero.superpower, {
        validators: [Validators.required]
      }),
      rating: this.fb.nonNullable.control(hero.rating, {
        validators: [Validators.required]
      }),
      health: this.fb.nonNullable.control(hero.health, {
        validators: [Validators.required]
      }),
      description: this.fb.nonNullable.control(hero.description, {
        validators: [Validators.required]
      })
    });
  }

  getFormControl(controlName: keyof HeroFormModel): FormControl {
    return this.heroForm.get(controlName) as FormControl;
  }

  closeDetails() {
    this.router.navigate(['/heroes']);
  }

  updateHero() {
    if (this.heroForm.valid && this.hero) {
      const formValue = this.heroForm.getRawValue();
      const updatedHero: Hero = {
        ...this.hero,
        ...formValue
      };

      this.heroService.updateHero(updatedHero).subscribe({
        next: () => {
          this.closeDetails();
        },
        error: (error) => {
          console.error('Error updating hero:', error);
        }
      });
    }
  }
}
