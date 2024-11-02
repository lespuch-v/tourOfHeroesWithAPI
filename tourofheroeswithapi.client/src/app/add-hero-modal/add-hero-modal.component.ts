// add-hero-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroFormModel } from '../models/models';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-add-hero-modal',
  templateUrl: './add-hero-modal.component.html',
  styleUrl: './add-hero-modal.component.css'
})
export class AddHeroModalComponent implements OnInit {
  isModalOpen: boolean = false;
  heroForm!: FormGroup<HeroFormModel>;
  heroTypes = ['strength', 'intelligence', 'magic', 'speed', 'technology'] as const;

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
      console.log(formValue);
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
