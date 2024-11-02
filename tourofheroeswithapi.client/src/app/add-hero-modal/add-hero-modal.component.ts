// add-hero-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateHeroDTO, HeroFormModel } from '../models/models';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-add-hero-modal',
  templateUrl: './add-hero-modal.component.html',
  styleUrl: './add-hero-modal.component.css'
})
export class AddHeroModalComponent implements OnInit {
  isModalOpen: boolean = false;
  heroForm!: FormGroup<HeroFormModel>;
  heroTypes: string[] = ['strength', 'intelligence', 'magic', 'speed', 'technology'];

  constructor(private fb: FormBuilder, private heroService: HeroService) {}

  ngOnInit(): void {
    this.startForm();
  }

  private startForm() {
    this.heroForm = this.fb.group<HeroFormModel>({
      name: this.fb.control('', {validators: [Validators.required], nonNullable: true}),
      type: this.fb.control('', {validators: [Validators.required], nonNullable: true}),
      superpower: this.fb.control('', {nonNullable: true}),
      rating: this.fb.control(0, {nonNullable: true}),
      health: this.fb.control(0, {nonNullable: true}),
      description: this.fb.control('', {nonNullable: true})
    });
  }

  handleSubmit(): void {
    if (this.heroForm.valid) {
      const formValue = this.heroForm.getRawValue();

      const form: CreateHeroDTO = {
        name: formValue.name ?? '',
        type: formValue.type as 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology',
        superpower: formValue.superpower ?? '',
        rating: formValue.rating ?? 0,
        health: formValue.health ?? 0,
        description: formValue.description ?? ''
      }

      this.heroService.addHero(form).subscribe(result => {
        console.log('Hero added...', result )
        this.closeModal();
      })
    } else {
      console.log('Form is invalid');
    }
  }

  getFormControl(controlName: string): FormControl {
    return this.heroForm.get(controlName) as FormControl;
  }

  openModal(): void {
    this.isModalOpen = true;
    this.startForm();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
