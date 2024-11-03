import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateHeroDTO, HeroFormModel, HeroType } from '../models/models';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-add-hero-modal',
  templateUrl: './add-hero-modal.component.html',
  styleUrl: './add-hero-modal.component.css'
})
export class AddHeroModalComponent implements OnInit {
  isModalOpen: boolean = false;
  heroForm!: FormGroup<HeroFormModel>;
  heroTypes: HeroType[] = ['strength', 'intelligence', 'magic', 'speed', 'technology'];

  constructor(private fb: FormBuilder, private heroService: HeroService) {}

  ngOnInit(): void {
    this.startForm();
  }

  private startForm() {
    this.heroForm = this.fb.group<HeroFormModel>({
      name: this.fb.nonNullable.control('', {
        validators: [Validators.required]
      }),
      type: this.fb.nonNullable.control<HeroType>('strength', {
        validators: [Validators.required]
      }),
      superpower: this.fb.nonNullable.control('', {
        validators: [Validators.required]
      }),
      rating: this.fb.nonNullable.control(0, {
        validators: [Validators.required, Validators.min(0), Validators.max(100)]
      }),
      health: this.fb.nonNullable.control(0, {
        validators: [Validators.required, Validators.min(0), Validators.max(100)]
      }),
      description: this.fb.nonNullable.control('', {
        validators: [Validators.required]
      })
    });
  }

  handleSubmit(): void {
    if (this.heroForm.valid) {
      const formValue = this.heroForm.getRawValue();

      const form: CreateHeroDTO = {
        name: formValue.name,
        type: formValue.type,
        superpower: formValue.superpower,
        rating: formValue.rating,
        health: formValue.health,
        description: formValue.description
      };

      this.heroService.addHero(form).subscribe(result => {
        console.log('Hero added...', result);
        this.closeModal();
      });
    }
  }

  openModal(): void {
    this.isModalOpen = true;
    this.startForm();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
